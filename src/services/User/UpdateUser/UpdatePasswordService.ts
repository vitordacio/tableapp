import { inject, injectable } from 'tsyringe';
import { User } from '@entities/User/User';

import { IUserRepository } from '@repositories/UserRepository/IUserRepository';
import { AppError } from '@utils/AppError';
import { IHashProvider } from '@providers/HashProvider/IHashProvider';
import { IUpdatePasswordDTO } from './GeneralsDTO';

@injectable()
class UpdatePasswordService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  async execute({
    password,
    new_password,
    user,
  }: IUpdatePasswordDTO): Promise<User> {
    const foundUser = await this.userRepository.findById(user.id);

    if (!foundUser) {
      throw new AppError('Usuário não encontrado.', 404);
    }

    const verify = await this.hashProvider.validateHash(
      password,
      foundUser.password,
    );

    if (!verify) {
      throw new AppError('Senha inválida.', 404);
    }

    const hashedPassword = await this.hashProvider.generateHash(new_password);

    foundUser.password = hashedPassword;

    await this.userRepository.save(foundUser);

    return foundUser;
  }
}

export { UpdatePasswordService };
