import { inject, injectable } from 'tsyringe';
import { User } from '@entities/User/User';

import { IUserRepository } from '@repositories/UserRepository/IUserRepository';
import { AppError } from '@utils/AppError';
import { isUsername } from '@utils/validations';
import { extractTagsFromText } from '@utils/generateTags';
import { IUpdateUsernameDTO } from './GeneralsDTO';

@injectable()
class UpdateUsernameService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute({ username, user }: IUpdateUsernameDTO): Promise<User> {
    const foundUser = await this.userRepository.findById(user.id);

    if (!foundUser) {
      throw new AppError('Usuário não encontrado.', 404);
    }

    if (!isUsername(username)) {
      throw new AppError('Nome de usuário inválido.', 400);
    }

    const alreadyExist = await this.userRepository.findByUsername(username);

    if (alreadyExist) {
      throw new AppError('Nome de usuário já existe.', 400);
    }

    foundUser.username = username;
    foundUser.tags = extractTagsFromText(
      `${username} ${foundUser.name}`,
    ) as unknown as string;

    await this.userRepository.save(foundUser);

    return foundUser;
  }
}

export { UpdateUsernameService };
