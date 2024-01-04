import { inject, injectable } from 'tsyringe';
import { Participation } from '@entities/Participation/Participation';
import { IParticipationRepository } from '@repositories/ParticipationRepository/IParticipationRepository';
import { IUserRepository } from '@repositories/UserRepository/IUserRepository';
import { AppError } from '@utils/AppError';
import { checkEventStatus } from '@utils/handleEvent';
import { IFindByUserIdDTO } from './IFindParticipationsDTO';

@injectable()
class FindParticipationsByUserIdService {
  constructor(
    @inject('ParticipationRepository')
    private participationRepository: IParticipationRepository,

    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute({
    user_id,
    limit,
    page,
  }: IFindByUserIdDTO): Promise<Participation[]> {
    const [user, participations] = await Promise.all([
      this.userRepository.findById(user_id),
      this.participationRepository.findByUserId(
        user_id,
        page || 1,
        limit || 20,
      ),
    ]);

    if (!user) {
      throw new AppError('Usuário não encontrado.', 404);
    }

    participations.forEach(participation => {
      const modifiedEvent = {
        ...participation.event,
        event_status: checkEventStatus(participation.event),
      };
      participation.event = modifiedEvent;
    });

    return participations;
  }
}

export { FindParticipationsByUserIdService };
