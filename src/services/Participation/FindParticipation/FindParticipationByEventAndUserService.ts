import { inject, injectable } from 'tsyringe';
import { Participation } from '@entities/Participation/Participation';
import { IParticipationRepository } from '@repositories/ParticipationRepository/IParticipationRepository';
import { IEventRepository } from '@repositories/EventRepository/IEventRepository';
import { IUserRepository } from '@repositories/UserRepository/IUserRepository';
import { AppError } from '@utils/AppError';
import { checkParticipationStatus } from '@utils/handleParticipation';
import { IFindByEventAndUserDTO } from './IFindParticipationsDTO';

@injectable()
class FindParticipationByEventAndUserService {
  constructor(
    @inject('ParticipationRepository')
    private participationRepository: IParticipationRepository,

    @inject('EventRepository')
    private eventRepository: IEventRepository,

    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute({
    user_id,
    event_id,
    reqUser,
  }: IFindByEventAndUserDTO): Promise<Participation | undefined> {
    const [user, event, participation] = await Promise.all([
      this.userRepository.findById(user_id),
      this.eventRepository.findById(event_id),
      this.participationRepository.findByUserAndEvent(user_id, event_id),
    ]);

    if (!user) {
      throw new AppError('Usuário não encontrado', 404);
    }

    if (!event) {
      throw new AppError('Evento não encontrado', 404);
    }

    if (reqUser.id !== event.author_id) {
      const hasAuth = await this.participationRepository.checkMod(
        reqUser.id,
        event.id_event,
      );

      if (!hasAuth) {
        throw new AppError('Não autorizado.', 403);
      }
    }

    if (participation)
      participation.participation_status = checkParticipationStatus({
        event,
        user_id: reqUser.id,
        participation,
      });

    return participation;
  }
}

export { FindParticipationByEventAndUserService };
