// insert into social_network_types
// (id_social_network_type, type, base_url, deep_link)
// values
// ('d0958c37-e64d-4bfe-b0a3-af03496a1ec6', 'instagram', 'https://instagram.com/', 'instagram://user?username='),
// ('1b83e56e-43e9-43d6-a02f-9820ba3fa5c5', 'youtube', 'https://youtube.com/', 'youtube://www.youtube.com/user/'),
// ('f8c803bd-8c9c-40a4-8bf6-104657515c1e', 'twitter', 'https://twitter.com/', 'twitter://user?screen_name='),
// ('53caf145-e69f-4fbc-87b5-c93f1d346caf', 'tiktok', 'https://tiktok.com/@', 'tiktok://user/'),
// ('b4c7868a-6d34-4c14-a7d5-32077a76591c', 'twitch', 'https://twitch.tv/', 'twitch://')

import { inject, injectable } from 'tsyringe';
import { v4 } from 'uuid';
import { ISocialNetworkRepository } from '@repositories/SocialNetworkRepository/ISocialNetworkRepository';
import { ISocialNetworkTypeRepository } from '@repositories/SocialNetworkTypeRepository/ISocialNetworkTypeRepository';
import { AppError } from '@utils/AppError';
import { IUserRepository } from '@repositories/UserRepository/IUserRepository';
import { SocialNetwork } from '@entities/SocialNetwork/SocialNetwork';
import { User } from '@entities/User/User';
import { ICreateSocialNetworkDTO } from './GeneralsDTO';

@injectable()
class CreateSocialNetworkService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('SocialNetworkRepository')
    private socialNetworkRepository: ISocialNetworkRepository,

    @inject('SocialNetworkTypeRepository')
    private socialNetworkTypeRepository: ISocialNetworkTypeRepository,
  ) {}

  async execute({
    username,
    type_id,
    user,
  }: ICreateSocialNetworkDTO): Promise<User> {
    let social: SocialNetwork | undefined;
    const foundUser = await this.userRepository.findById(user.id);

    if (!foundUser) {
      throw new AppError('Usuário não encontrado.', 404);
    }

    const socialType = await this.socialNetworkTypeRepository.findById(type_id);

    if (!socialType) {
      throw new AppError('Tipo de rede social não encontrada.', 404);
    }

    if (foundUser.social_networks.length !== 0) {
      social = foundUser.social_networks.find(
        userSocial => userSocial.type_id === type_id,
      );

      if (social) {
        throw new AppError('Rede social já cadastrada.', 400);
      }
    }

    social = this.socialNetworkRepository.create({
      id: v4(),
      username,
      type_id: socialType.id_social_network_type,
      user_id: user.id,
    });

    await this.socialNetworkRepository.save(social);

    socialType.count += 1;
    await this.socialNetworkTypeRepository.save(socialType);

    social.type = socialType;
    foundUser.social_networks = [...foundUser.social_networks, social];

    return foundUser;
  }
}

export { CreateSocialNetworkService };
