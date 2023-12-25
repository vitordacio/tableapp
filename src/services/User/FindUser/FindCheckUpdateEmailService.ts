import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '@repositories/UserRepository/IUserRepository';
import { verifyCanUpdateDate } from '@utils/handleDate';
import { AppError } from '@utils/AppError';

@injectable()
class FindCheckUpdateEmailService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute(
    reqUser: AuthorizedUser<UserPerm | PubPerm>,
  ): Promise<{ canUpdateEmail: boolean; email_updated_at: Date }> {
    const user = await this.userRepository.findById(reqUser.id);

    if (!user) {
      throw new AppError('Usuário não encontrado.', 404);
    }

    const startDate: Date = new Date(user.email_updated_at);
    const finishDate: Date = new Date();

    const canUpdateEmail = verifyCanUpdateDate({
      startDate,
      finishDate,
      days: 30,
    });

    return {
      canUpdateEmail,
      email_updated_at: user.email_updated_at,
    };
  }
}

export { FindCheckUpdateEmailService };
