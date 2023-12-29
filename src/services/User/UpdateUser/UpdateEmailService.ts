import { inject, injectable } from 'tsyringe';
import { v4 } from 'uuid';
import { User } from '@entities/User/User';
import { IUserRepository } from '@repositories/UserRepository/IUserRepository';
import { IUserUpdateRepository } from '@repositories/UserUpdateRepository/IUserUpdateRepository';
import { AppError } from '@utils/AppError';
import { verifyCanUpdate } from '@utils/handleDate';
import { IUpdateEmailDTO } from './GeneralsDTO';

@injectable()
class UpdateEmailService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('UserUpdateRepository')
    private userUpdateRepository: IUserUpdateRepository,
  ) {}

  async execute({ email, user }: IUpdateEmailDTO): Promise<User> {
    const [foundUser, emailExists, lastUpdate] = await Promise.all([
      this.userRepository.findById(user.id),
      this.userRepository.findByEmail(email),
      this.userUpdateRepository.findLastByTypeAndUserId('email', user.id),
    ]);

    if (!foundUser) {
      throw new AppError(
        'Token expirado. Por favor, realize o login novamente.',
        400,
      );
    }

    if (emailExists) {
      throw new AppError('Email já cadastrado no sistema.', 400);
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
      type: 'email',
      from: foundUser.email,
      to: email,
      user_id: foundUser.id_user,
    });

    foundUser.email = email;

    await Promise.all([
      this.userRepository.save(foundUser),
      this.userUpdateRepository.save(newUpdate),
    ]);

    return foundUser;
  }
}

export { UpdateEmailService };
