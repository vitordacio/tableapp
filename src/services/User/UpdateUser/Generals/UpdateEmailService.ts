import { inject, injectable } from 'tsyringe';
import { User } from '@entities/User/User';

import { IUserRepository } from '@repositories/UserRepository/IUserRepository';
import { AppError } from '@utils/AppError';
import { IUpdateEmailDTO } from './GeneralsDTO';

@injectable()
class UpdateEmailService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute({ email, user }: IUpdateEmailDTO): Promise<User> {
    const foundUser = await this.userRepository.findById(user.id);

    if (!foundUser) {
      throw new AppError('Usuário não encontrado.', 404);
    }

    const emailExists = await this.userRepository.findByEmail(email, 'user');

    if (emailExists) {
      throw new AppError('Email já cadastrado no sistema.', 400);
    }

    foundUser.email = email;

    await this.userRepository.save(foundUser);

    return foundUser;
  }
}

export { UpdateEmailService };
