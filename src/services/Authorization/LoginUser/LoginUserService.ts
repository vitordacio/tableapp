import { inject, injectable } from 'tsyringe';

import { IHashProvider } from '@providers/HashProvider/IHashProvider';
import { generateAccessToken } from '@providers/Token/AccessTokenProvider';
import { IUserRepository } from '@repositories/UserRepository/IUserRepository';
import { AppError } from '@utils/AppError';

import { isEmail } from '@utils/validations';
import { ILoginUserDTO, ILoginUserResponse } from './LoginUserDTO';

@injectable()
class LoginUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  async execute({
    login,
    password,
  }: ILoginUserDTO): Promise<ILoginUserResponse> {
    const user = isEmail(login)
      ? await this.userRepository.findByEmail(login, 'user')
      : await this.userRepository.findByUsername(login);

    if (!user) {
      throw new AppError('Combinação de usuário/senha incorreta!', 401);
    }

    const passwordMatched = await this.hashProvider.validateHash(
      password,
      user.password,
    );

    if (!passwordMatched) {
      throw new AppError('Combinação de usuário/senha incorreta!', 401);
    }

    const accessToken = generateAccessToken(
      user.id_user,
      user.role_name as RoleOptions,
    );

    return {
      user,
      accessToken,
    };
  }
}

export { LoginUserService };
