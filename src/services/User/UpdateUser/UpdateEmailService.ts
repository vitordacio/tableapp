import { inject, injectable } from 'tsyringe';
import { User } from '@entities/User/User';
import { IUserRepository } from '@repositories/UserRepository/IUserRepository';
import { AppError } from '@utils/AppError';
import { verifyCanUpdateDate } from '@utils/handleDate';
import { IUpdateEmailDTO } from './GeneralsDTO';

@injectable()
class UpdateEmailService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute({ email, user }: IUpdateEmailDTO): Promise<User> {
    const [foundUser, emailExists] = await Promise.all([
      this.userRepository.findById(user.id),
      this.userRepository.findByEmail(email),
    ]);

    if (!foundUser) {
      throw new AppError('Usuário não encontrado.', 404);
    }

    const startDate: Date = new Date(foundUser.email_updated_at);
    const finishDate: Date = new Date();

    const canUpdateEmail = verifyCanUpdateDate({
      startDate,
      finishDate,
      days: 30,
    });

    if (!canUpdateEmail) {
      throw new AppError(
        `Aguarde 30 dias a partir da última atualização de e-mail. ${startDate.toLocaleString()}`,
        400,
      );
    }

    if (emailExists) {
      throw new AppError('Email já cadastrado no sistema.', 400);
    }

    foundUser.email = email;
    foundUser.email_updated_at = finishDate;

    await this.userRepository.save(foundUser);

    return foundUser;
  }
}

export { UpdateEmailService };
