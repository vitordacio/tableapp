import { inject, injectable } from 'tsyringe';
import { User } from '@entities/User/User';

import { IUserRepository } from '@repositories/UserRepository/IUserRepository';
import { AppError } from '@utils/AppError';
import { extractTagsFromText } from '@utils/generateTags';
import { verifyCanUpdateDate } from '@utils/handleDate';
import { IUpdateNameDTO } from './GeneralsDTO';

@injectable()
class UpdateNameService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute({ name, user }: IUpdateNameDTO): Promise<User> {
    if (name.length < 4) {
      throw new AppError('Primeiro nome precisa ter ao menos 4 dígitos.', 400);
    }

    const foundUser = await this.userRepository.findById(user.id);

    if (!foundUser) {
      throw new AppError('Usuário não encontrado.', 404);
    }

    const startDate: Date = new Date(foundUser.name_updated_at);
    const finishDate: Date = new Date();

    const canUpdateName = verifyCanUpdateDate({
      startDate,
      finishDate,
      days: 5,
    });

    if (!canUpdateName) {
      throw new AppError(
        `Aguarde 5 dias a partir da última atualização do nome. ${startDate.toLocaleString()}`,
        400,
      );
    }

    foundUser.name = name;
    foundUser.tags = extractTagsFromText(
      `${foundUser.username} ${name}`,
    ) as unknown as string;
    foundUser.name_updated_at = finishDate;

    await this.userRepository.save(foundUser);

    return foundUser;
  }
}

export { UpdateNameService };
