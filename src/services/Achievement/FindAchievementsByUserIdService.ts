import { inject, injectable } from 'tsyringe';
import { Achievement } from '@entities/Achievement/Achievement';
import { IAchievementRepository } from '@repositories/AchievementRepository/IAchievementRepository';
import { IUserRepository } from '@repositories/UserRepository/IUserRepository';
import { AppError } from '@utils/AppError';
import { IFindByUserIdDTO } from './IFindAchievementsDTO';

@injectable()
class FindAchievementsByUserIdService {
  constructor(
    @inject('AchievementRepository')
    private achievementRepository: IAchievementRepository,

    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute({
    user_id,
    limit,
    page,
  }: IFindByUserIdDTO): Promise<Achievement[]> {
    const [user, achievements] = await Promise.all([
      this.userRepository.findById(user_id),
      this.achievementRepository.findByUserId(user_id, page || 1, limit || 20),
    ]);

    if (!user) {
      throw new AppError('Usuário não encontrado.', 404);
    }

    return achievements;
  }
}

export { FindAchievementsByUserIdService };
