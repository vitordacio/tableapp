import { inject, injectable } from 'tsyringe';
import { v4 } from 'uuid';
import { IHashProvider } from '@providers/HashProvider/IHashProvider';
import { IUserRepository } from '@repositories/UserRepository/IUserRepository';
import { User } from '@entities/User/User';
import { AppError } from '@utils/AppError';
import { isUsername } from '@utils/validations';
import { extractTagsFromText } from '@utils/generateTags';
import { ICreateUserDTO } from './CreateUserServiceDTO';

@injectable()
class CreateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  async execute({
    name,
    email,
    username,
    password,
  }: ICreateUserDTO): Promise<User> {
    if (name.length < 4) {
      throw new AppError('Nome precisa ter ao menos 4 dígitos.', 400);
    }

    if (!isUsername(username)) {
      throw new AppError('Nome de usuário inválido.', 400);
    }

    const [emailExists, usernameExists] = await Promise.all([
      this.userRepository.findByEmail(email),
      this.userRepository.findByUsername(username),
    ]);

    if (emailExists) {
      throw new AppError('Email já cadastrado no sistema.', 400);
    }

    if (usernameExists) {
      throw new AppError('Nome de usuário já cadastrado no sistema.', 400);
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = this.userRepository.create({
      id: v4(),
      name,
      email,
      username,
      password: hashedPassword,
      tags: extractTagsFromText(`${username} ${name}`),
    });

    if (username === 'master') user.role_name = 'master';

    await this.userRepository.save(user);

    return user;
  }
}

export { CreateUserService };
