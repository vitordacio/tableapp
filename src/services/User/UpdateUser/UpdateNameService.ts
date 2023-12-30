import { inject, injectable } from 'tsyringe';
import { v4 } from 'uuid';
import { User } from '@entities/User/User';
import { IUserRepository } from '@repositories/UserRepository/IUserRepository';
import { IUserUpdateRepository } from '@repositories/UserUpdateRepository/IUserUpdateRepository';
import { AppError } from '@utils/AppError';
import { extractTagsFromText } from '@utils/generateTags';
import { verifyCanUpdate } from '@utils/handleDate';
import { IUpdateNameDTO } from './GeneralsDTO';

@injectable()
class UpdateNameService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('UserUpdateRepository')
    private userUpdateRepository: IUserUpdateRepository,
  ) {}

  async execute({ name, user }: IUpdateNameDTO): Promise<User> {
    if (name.length < 4) {
      throw new AppError('Primeiro nome precisa ter ao menos 4 dígitos.', 400);
    }

    const [foundUser, lastUpdate] = await Promise.all([
      this.userRepository.findById(user.id),
      this.userUpdateRepository.findLastByTypeAndUserId('name', user.id),
    ]);

    if (!foundUser) {
      throw new AppError(
        'Token expirado. Por favor, realize o login novamente.',
        400,
      );
    }

    if (lastUpdate) {
      const canUpdate = verifyCanUpdate({
        lastUpdate,
        days: 7,
      });

      if (!canUpdate) {
        throw new AppError(
          'Operação não permitida. Aguarde 7 dias a partir da última modificação antes de tentar novamente.',
          403,
        );
      }
    }

    const newUpdate = this.userUpdateRepository.create({
      id: v4(),
      type: 'name',
      from: foundUser.name,
      to: name,
      user_id: foundUser.id_user,
    });

    foundUser.name = name;
    foundUser.tags = extractTagsFromText(
      `${foundUser.username} ${name}`,
    ) as unknown as string;

    await Promise.all([
      this.userRepository.save(foundUser),
      this.userUpdateRepository.save(newUpdate),
    ]);

    return foundUser;
  }
}

export { UpdateNameService };
