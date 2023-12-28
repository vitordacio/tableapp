import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '@repositories/UserRepository/IUserRepository';
import { verifyCanUpdateDate } from '@utils/handleDate';
import { AppError } from '@utils/AppError';

type CheckUpdateNameResponse = {
  canUpdateName: boolean;
  name_updated_at: Date | null;
};

@injectable()
class FindCheckUpdateNameService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute(
    reqUser: AuthorizedUser<UserPerm | PubPerm>,
  ): Promise<CheckUpdateNameResponse> {
    const response: CheckUpdateNameResponse = {
      canUpdateName: true,
      name_updated_at: null,
    };
    const user = await this.userRepository.findById(reqUser.id);

    if (!user) {
      throw new AppError('Usuário não encontrado.', 404);
    }

    if (user.name_updated_at) {
      response.name_updated_at = user.name_updated_at;

      const startDate: Date = new Date(user.name_updated_at);
      const finishDate: Date = new Date();

      response.canUpdateName = verifyCanUpdateDate({
        startDate,
        finishDate,
        days: 5,
      });
    }

    return response;
  }
}

export { FindCheckUpdateNameService };
