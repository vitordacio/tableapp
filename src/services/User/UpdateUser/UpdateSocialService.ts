import { inject, injectable } from 'tsyringe';
import { User } from '@entities/User/User';

import { IUserRepository } from '@repositories/UserRepository/IUserRepository';
import { AppError } from '@utils/AppError';
import { IUpdateSocialDTO } from './GeneralsDTO';

@injectable()
class UpdateSocialService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute({ social, user }: IUpdateSocialDTO): Promise<User> {
    const foundUser = await this.userRepository.findById(user.id);

    if (!foundUser) {
      throw new AppError('Usuário não encontrado.', 404);
    }
    return 'not done';
    foundUser.social = social;

    await this.userRepository.save(foundUser);

    return foundUser;
  }
}

export { UpdateSocialService };
