import { inject, injectable } from 'tsyringe';
import { AppError } from '@utils/AppError';
import { ISocialNetworkRepository } from '@repositories/SocialNetworkRepository/ISocialNetworkRepository';
import { IUserRepository } from '@repositories/UserRepository/IUserRepository';
import { SocialNetwork } from '@entities/SocialNetwork/SocialNetwork';

@injectable()
class FindSocialNetworkService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('SocialNetworkRepository')
    private socialNetworkRepository: ISocialNetworkRepository,
  ) {}

  async execute(
    reqUser: AuthorizedUser<UserPerm | PubPerm>,
  ): Promise<SocialNetwork[]> {
    const [user, socials] = await Promise.all([
      this.userRepository.findById(reqUser.id),
      this.socialNetworkRepository.findByUser(reqUser.id),
    ]);

    if (!user) {
      throw new AppError(
        'Token expirado, por favor realize login novamente.',
        400,
      );
    }

    return socials;
  }
}

export { FindSocialNetworkService };
