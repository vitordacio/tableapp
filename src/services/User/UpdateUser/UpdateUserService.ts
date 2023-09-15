// import { Address } from '@entities/Address/Address';
// import { Permission } from '@entities/Permission/Permission';
import { inject, injectable } from 'tsyringe';
import { User } from '@entities/User/User';
import { IHashProvider } from '@providers/HashProvider/IHashProvider';

import { IUserRepository } from '@repositories/UserRepository/IUserRepository';
import { AppError } from '@utils/AppError';
// import { v4 } from 'uuid';
import { IUpdateUserDTO } from './UpdateUserDTO';
// import { IRefreshTokenRepository } from '@repositories/RefreshTokenRepository/IRefreshTokenRepository';

@injectable()
class UpdateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider, // @inject('RefreshTokenRepository') // private refreshTokenRepository: IRefreshTokenRepository,
  ) {}

  async execute({
    name,
    bio,
    location,
    age,
    gender,
    user,
  }: IUpdateUserDTO): Promise<User> {
    const foundUser = await this.userRepository.findById(user.id);

    if (!foundUser) {
      throw new AppError('Usuário não encontrado.', 404);
    }

    foundUser.name = name;
    if (bio) foundUser.bio = bio;
    if (location) foundUser.location = location;
    if (age) foundUser.age = age;
    if (gender) foundUser.gender = gender;

    await this.userRepository.save(foundUser);

    return foundUser;
  }
}

export { UpdateUserService };
