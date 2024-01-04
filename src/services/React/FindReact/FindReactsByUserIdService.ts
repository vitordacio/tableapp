import { inject, injectable } from 'tsyringe';
import { React } from '@entities/React/React';
import { IReactRepository } from '@repositories/ReactRepository/IReactRepository';
import { IUserRepository } from '@repositories/UserRepository/IUserRepository';
import { AppError } from '@utils/AppError';
import { IFindByUserIdDTO } from './IFindReactsDTO';

@injectable()
class FindReactsByUserIdService {
  constructor(
    @inject('ReactRepository')
    private reactRepository: IReactRepository,

    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute({ user_id, limit, page }: IFindByUserIdDTO): Promise<React[]> {
    const [user, reacts] = await Promise.all([
      this.userRepository.findById(user_id),
      this.reactRepository.findByUserId(user_id, page || 1, limit || 20),
    ]);

    if (!user) {
      throw new AppError('Usuário não encontrado.', 404);
    }

    return reacts;
  }
}

export { FindReactsByUserIdService };
