import { inject, injectable } from 'tsyringe';
import { User } from '@entities/User/User';

import { IUserRepository } from '@repositories/UserRepository/IUserRepository';
import { AppError } from '@utils/AppError';
import { IUpdatePictureDTO } from './GeneralsDTO';

@injectable()
class UpdatePictureService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute({ image, user }: IUpdatePictureDTO): Promise<User> {
    const foundUser = await this.userRepository.findById(user.id);

    if (!foundUser) {
      throw new AppError('Usuário não encontrado.', 404);
    }

    foundUser.picture = image;

    await this.userRepository.save(foundUser);

    return foundUser;
  }
}

export { UpdatePictureService };
