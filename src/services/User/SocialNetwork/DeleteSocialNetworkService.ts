import { inject, injectable } from 'tsyringe';

import { AppError } from '@utils/AppError';
import { ISocialNetworkRepository } from '@repositories/SocialNetworkRepository/ISocialNetworkRepository';
import { IUserRepository } from '@repositories/UserRepository/IUserRepository';
import { User } from '@entities/User/User';
import { ISocialNetworkTypeRepository } from '@repositories/SocialNetworkTypeRepository/ISocialNetworkTypeRepository';

@injectable()
class DeleteSocialNetworkService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('SocialNetworkRepository')
    private socialNetworkRepository: ISocialNetworkRepository,

    @inject('SocialNetworkTypeRepository')
    private socialNetworkTypeRepository: ISocialNetworkTypeRepository,
  ) {}

  async execute(
    social_network_id: string,
    reqUser: AuthorizedUser<UserPerm | PubPerm>,
  ): Promise<User> {
    const [user, social] = await Promise.all([
      this.userRepository.findById(reqUser.id),
      this.socialNetworkRepository.findById(social_network_id),
    ]);

    if (!user) {
      throw new AppError('Usuário não encontrado.', 404);
    }

    if (!social || social.user_id !== user.id_user) {
      throw new AppError('Rede social não encontrada.', 404);
    }

    const socialType = social.type;
    socialType.count -= 1;

    await Promise.all([
      this.socialNetworkRepository.remove(social),
      this.socialNetworkTypeRepository.save(socialType),
    ]);

    user.social_networks = user.social_networks.filter(
      userSocial => userSocial.id_social_network !== social_network_id,
    );

    return user;
  }
}

export { DeleteSocialNetworkService };
