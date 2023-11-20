import { inject, injectable } from 'tsyringe';

import { AppError } from '@utils/AppError';
import { ISocialNetworkRepository } from '@repositories/SocialNetworkRepository/ISocialNetworkRepository';
import { IUserRepository } from '@repositories/UserRepository/IUserRepository';
import { User } from '@entities/User/User';

@injectable()
class DeleteSocialNetworkService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('SocialNetworkRepository')
    private socialNetworkRepository: ISocialNetworkRepository,
  ) {}

  async execute(
    social_network_id: string,
    user: AuthorizedUser<UserPerm | PubPerm>,
  ): Promise<User> {
    const foundUser = await this.userRepository.findById(user.id);

    if (!foundUser) {
      throw new AppError('Usuário não encontrado.', 404);
    }

    const social = await this.socialNetworkRepository.findById(
      social_network_id,
    );

    if (!social || social.user_id !== foundUser.id_user) {
      throw new AppError('Rede social não encontrada.', 404);
    }

    await this.socialNetworkRepository.remove(social);

    foundUser.social_networks = foundUser.social_networks.filter(
      userSocial => userSocial.id_social_network !== social_network_id,
    );

    return foundUser;
  }
}

export { DeleteSocialNetworkService };
