import { inject, injectable } from 'tsyringe';
import { User } from '@entities/User/User';

import { IUserRepository } from '@repositories/UserRepository/IUserRepository';
import { AppError } from '@utils/AppError';
import { IUpdateCoverPhotoDTO } from './GeneralsDTO';

@injectable()
class UpdateCoverPhotoService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute({ cover_photo, user }: IUpdateCoverPhotoDTO): Promise<User> {
    const foundUser = await this.userRepository.findById(user.id);

    if (!foundUser) {
      throw new AppError('Usuário não encontrado.', 404);
    }

    foundUser.cover_photo = cover_photo;

    await this.userRepository.save(foundUser);

    return foundUser;
  }
}

export { UpdateCoverPhotoService };
