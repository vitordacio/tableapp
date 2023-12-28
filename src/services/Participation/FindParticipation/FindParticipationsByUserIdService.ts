import { inject, injectable } from 'tsyringe';
import { Participation } from '@entities/Participation/Participation';
import { IParticipationRepository } from '@repositories/ParticipationRepository/IParticipationRepository';
import { IUserRepository } from '@repositories/UserRepository/IUserRepository';
import { AppError } from '@utils/AppError';
import { generateEventControl } from '@utils/handleControl';
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
    reqUser,
  }: IFindByUserIdDTO): Promise<Participation[]> {
    const [requester, user, participations] = await Promise.all([
      this.userRepository.findById(reqUser.id),
      this.userRepository.findById(user_id),
      this.participationRepository.findByUserId(
        user_id,
        page || 1,
        limit || 20,
      ),
    ]);

    if (!requester) {
      throw new AppError('Token expirado, realize login novamente.', 403);
    }

    if (!user) {
      throw new AppError('Usuário não encontrado', 404);
    }

    if (participations.length !== 0) {
      const event_ids = participations.map(
        participation => participation.event_id,
      );

      const userParticipations =
        await this.participationRepository.checkUserParticipations(
          requester.id_user,
          event_ids,
        );

      participations.forEach(participation => {
        const userParticipation = userParticipations.find(
          part => part.event_id === participation.event_id,
        );
        participation.event.control = generateEventControl({
          event: participation.event,
          participation: userParticipation,
          user: requester,
        });
      });
    }

    return participations;
  }
}

export { FindParticipationsByUserIdService };
