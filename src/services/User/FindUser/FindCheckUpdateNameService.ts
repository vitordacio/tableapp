import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '@repositories/UserRepository/IUserRepository';
import { verifyCanUpdateDate } from '@utils/handleDate';
import { AppError } from '@utils/AppError';

@injectable()
class FindCheckUpdateNameService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute(
    reqUser: AuthorizedUser<UserPerm | PubPerm>,
  ): Promise<{ canUpdateName: boolean; name_updated_at: Date }> {
    const user = await this.userRepository.findById(reqUser.id);

    if (!user) {
      throw new AppError('Usuário não encontrado.', 404);
    }

    const startDate: Date = new Date(user.name_updated_at);
    const finishDate: Date = new Date();

    const canUpdateName = verifyCanUpdateDate({
      startDate,
      finishDate,
      days: 5,
    });

    return {
      canUpdateName,
      name_updated_at: user.name_updated_at,
    };
  }
}

export { FindCheckUpdateNameService };
