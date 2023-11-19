import { inject, injectable } from 'tsyringe';

import { AppError } from '@utils/AppError';
import { ISocialNetworkRepository } from '@repositories/SocialNetworkRepository/ISocialNetworkRepository';
import { IUserRepository } from '@repositories/UserRepository/IUserRepository';

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
  ): Promise<void> {
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
  }
}

export { DeleteSocialNetworkService };
