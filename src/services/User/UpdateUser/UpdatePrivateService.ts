import { inject, injectable } from 'tsyringe';
import { User } from '@entities/User/User';

import { IUserRepository } from '@repositories/UserRepository/IUserRepository';
import { AppError } from '@utils/AppError';
import { IUpdatePrivateDTO } from './GeneralsDTO';

@injectable()
class UpdatePrivateService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute({ set_private, user }: IUpdatePrivateDTO): Promise<User> {
    const foundUser = await this.userRepository.findById(user.id);

    if (!foundUser) {
      throw new AppError('Usuário não encontrado.', 404);
    }

    foundUser.private = set_private;

    await this.userRepository.save(foundUser);

    return foundUser;
  }
}

export { UpdatePrivateService };
