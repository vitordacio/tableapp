import { inject, injectable } from 'tsyringe';

import { User } from '@entities/User/User';
import { IUserRepository } from '@repositories/UserRepository/IUserRepository';

@injectable()
class FindUserByNameService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute(
    user_name: string,
    page: number,
    limit: number,
  ): Promise<User[]> {
    const name = user_name
      .toLocaleLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();

    const users = await this.userRepository.findByName(name, page, limit);

    return users;
  }
}

export { FindUserByNameService };
