import { inject, injectable } from 'tsyringe';
import { User } from '@entities/User/User';

import { IUserRepository } from '@repositories/UserRepository/IUserRepository';
import { AppError } from '@utils/AppError';
import { IUpdateGenderDTO } from './GeneralsDTO';

@injectable()
class UpdateGenderService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute({ gender, user }: IUpdateGenderDTO): Promise<User> {
    const foundUser = await this.userRepository.findById(user.id);

    if (!foundUser) {
      throw new AppError('Usuário não encontrado.', 404);
    }

    foundUser.gender = gender || (null as unknown as string);

    await this.userRepository.save(foundUser);

    return foundUser;
  }
}

export { UpdateGenderService };
