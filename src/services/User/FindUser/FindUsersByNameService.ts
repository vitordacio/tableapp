import { inject, injectable } from 'tsyringe';
import { User } from '@entities/User/User';
import { IUserRepository } from '@repositories/UserRepository/IUserRepository';
import { IFindUsersServiceDTO } from './IFindUsersServiceDTO';

@injectable()
class FindUsersByNameService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute({ name, page, limit }: IFindUsersServiceDTO): Promise<User[]> {
    const users = await this.userRepository.findByName(
      name || '',
      page || 1,
      limit || 20,
    );

    return users;
  }
}

export { FindUsersByNameService };
