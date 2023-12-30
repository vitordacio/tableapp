import { inject, injectable } from 'tsyringe';
import { v4 } from 'uuid';
import { User } from '@entities/User/User';
import { IUserRepository } from '@repositories/UserRepository/IUserRepository';
import { AppError } from '@utils/AppError';
import { IHashProvider } from '@providers/HashProvider/IHashProvider';
import { IUserUpdateRepository } from '@repositories/UserUpdateRepository/IUserUpdateRepository';
import { verifyCanUpdate } from '@utils/handleDate';
import { IUpdatePasswordDTO } from './GeneralsDTO';

@injectable()
class UpdatePasswordService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('UserUpdateRepository')
    private userUpdateRepository: IUserUpdateRepository,
  ) {}

  async execute({
    password,
    new_password,
    user,
  }: IUpdatePasswordDTO): Promise<User> {
    const [foundUser, lastUpdate] = await Promise.all([
      this.userRepository.findById(user.id),
      this.userUpdateRepository.findLastByTypeAndUserId('password', user.id),
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
        days: 5,
      });

      if (!canUpdate) {
        throw new AppError(
          'Operação não permitida. Aguarde 5 dias a partir da última modificação antes de tentar novamente.',
          403,
        );
      }
    }

    const verify = await this.hashProvider.validateHash(
      password,
      foundUser.password,
    );

    if (!verify) {
      throw new AppError('Senha inválida.', 404);
    }

    const hashedPassword = await this.hashProvider.generateHash(new_password);

    const newUpdate = this.userUpdateRepository.create({
      id: v4(),
      type: 'password',
      from: foundUser.password,
      to: hashedPassword,
      user_id: foundUser.id_user,
    });

    foundUser.password = hashedPassword;

    await Promise.all([
      this.userRepository.save(foundUser),
      this.userUpdateRepository.save(newUpdate),
    ]);

    return foundUser;
  }
}

export { UpdatePasswordService };
