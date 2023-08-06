import { inject, injectable } from 'tsyringe';
import { v4 } from 'uuid';

import { IHashProvider } from '@providers/HashProvider/IHashProvider';
import { IUserRepository } from '@repositories/UserRepository/IUserRepository';
import { User } from '@entities/User/User';

import { AppError } from '@utils/AppError';
import { ICreateUserDTO } from './CreateUserServiceDTO';

@injectable()
class CreateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  async execute({ email, username, password }: ICreateUserDTO): Promise<User> {
    const emailAlreadyExists = await this.userRepository.findByEmail(
      email,
      'user',
    );

    if (emailAlreadyExists) {
      throw new AppError('Email já cadastrado no sistema.', 409);
    }

    const usernameAlreadyExists = await this.userRepository.findByUsername(
      username,
    );

    if (usernameAlreadyExists) {
      throw new AppError('Nome de usuário já cadastrado no sistema.', 409);
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = this.userRepository.create({
      id: v4(),
      email,
      username,
      password: hashedPassword,
    });

    await this.userRepository.save(user);

    return user;
  }
}

export { CreateUserService };
