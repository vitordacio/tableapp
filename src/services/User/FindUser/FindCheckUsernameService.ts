import { inject, injectable } from 'tsyringe';

import { IUserRepository } from '@repositories/UserRepository/IUserRepository';
import { isUsername } from '@utils/validations';

@injectable()
class FindCheckUsernameService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute(username: string): Promise<boolean> {
    if (username.length < 4 || username.length > 16) return false;

    if (!isUsername(username)) return false;

    const alreadyExist = await this.userRepository.findByUsername(username);

    if (alreadyExist) return false;

    return true;
  }
}

export { FindCheckUsernameService };
