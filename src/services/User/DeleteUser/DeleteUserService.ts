import { inject, injectable } from 'tsyringe';

import { AppError } from '@utils/AppError';
import { IUserRepository } from '@repositories/UserRepository/IUserRepository';

@injectable()
class DeleteUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute(user: AuthorizedUser<UserPerm | PubPerm>): Promise<void> {
    const foundUser = await this.userRepository.findById(user.id);

    if (!foundUser) {
      throw new AppError('Usuário não encontrado.', 404);
    }

    await this.userRepository.remove(foundUser);
  }
}

export { DeleteUserService };
