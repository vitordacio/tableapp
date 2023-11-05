import { inject, injectable } from 'tsyringe';
import { User } from '@entities/User/User';

import { IUserRepository } from '@repositories/UserRepository/IUserRepository';
import { AppError } from '@utils/AppError';
import { IUpdateLocationDTO } from './GeneralsDTO';

@injectable()
class UpdateLocationService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute({ location, user }: IUpdateLocationDTO): Promise<User> {
    const foundUser = await this.userRepository.findById(user.id);

    if (!foundUser) {
      throw new AppError('Usuário não encontrado.', 404);
    }

    foundUser.location = location;

    await this.userRepository.save(foundUser);

    return foundUser;
  }
}

export { UpdateLocationService };
