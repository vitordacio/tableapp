import { inject, injectable } from 'tsyringe';
import { v4 } from 'uuid';
import { User } from '@entities/User/User';
import { IUserRepository } from '@repositories/UserRepository/IUserRepository';
import { IUserUpdateRepository } from '@repositories/UserUpdateRepository/IUserUpdateRepository';
import { AppError } from '@utils/AppError';
import { isUsername } from '@utils/validations';
import { extractTagsFromText } from '@utils/generateTags';
import { verifyCanUpdate } from '@utils/handleDate';
import { IUpdateUsernameDTO } from './GeneralsDTO';

@injectable()
class UpdateUsernameService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('UserUpdateRepository')
    private userUpdateRepository: IUserUpdateRepository,
  ) {}

  async execute({ username, user }: IUpdateUsernameDTO): Promise<User> {
    if (!isUsername(username)) {
      throw new AppError('Nome de usuário inválido.', 400);
    }

    const [foundUser, alreadyExist, lastUpdate] = await Promise.all([
      this.userRepository.findById(user.id),
      this.userRepository.findByUsername(username),
      this.userUpdateRepository.findLastByTypeAndUserId('username', user.id),
    ]);

    if (!foundUser) {
      throw new AppError(
        'Token expirado. Por favor, realize o login novamente.',
        400,
      );
    }

    if (alreadyExist) {
      throw new AppError('Nome de usuário já existe.', 400);
    }

    if (lastUpdate) {
      const canUpdate = verifyCanUpdate({
        lastUpdate,
        days: 30,
      });

      if (!canUpdate) {
        throw new AppError(
          'Operação não permitida. Aguarde 30 dias a partir da última modificação antes de tentar novamente.',
          403,
        );
      }
    }

    const newUpdate = this.userUpdateRepository.create({
      id: v4(),
      type: 'username',
      from: foundUser.username,
      to: username,
      user_id: foundUser.id_user,
    });

    foundUser.username = username;
    foundUser.tags = extractTagsFromText(
      `${username} ${foundUser.name}`,
    ) as unknown as string;

    await Promise.all([
      this.userRepository.save(foundUser),
      this.userUpdateRepository.save(newUpdate),
    ]);

    return foundUser;
  }
}

export { UpdateUsernameService };
