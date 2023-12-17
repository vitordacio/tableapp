import { inject, injectable } from 'tsyringe';
import { Participation } from '@entities/Participation/Participation';
import { IParticipationRepository } from '@repositories/ParticipationRepository/IParticipationRepository';
import { IUserRepository } from '@repositories/UserRepository/IUserRepository';
import { AppError } from '@utils/AppError';
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
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new AppError('Usuário não encontrado', 404);
    }

    const participation = await this.participationRepository.findByUserId(
      user.id_user,
      page || 1,
      limit || 20,
    );

    return participation;
  }
}

export { FindParticipationsByUserIdService };
