import { inject, injectable } from 'tsyringe';
import { User } from '@entities/User/User';

import { IUserRepository } from '@repositories/UserRepository/IUserRepository';
import { AppError } from '@utils/AppError';
import { extractTagsFromText } from '@utils/generateTags';
import { IUpdateNameDTO } from './GeneralsDTO';

@injectable()
class UpdateNameService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute({ name, user }: IUpdateNameDTO): Promise<User> {
    const foundUser = await this.userRepository.findById(user.id);

    if (!foundUser) {
      throw new AppError('Usuário não encontrado.', 404);
    }

    foundUser.name = name;
    foundUser.tags = extractTagsFromText(
      `${foundUser.username} ${name}`,
    ) as unknown as string;

    await this.userRepository.save(foundUser);

    return foundUser;
  }
}

export { UpdateNameService };
