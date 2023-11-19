import { inject, injectable } from 'tsyringe';
import { v4 } from 'uuid';
import { ISocialNetworkRepository } from '@repositories/SocialNetworkRepository/ISocialNetworkRepository';
import { ISocialNetworkTypeRepository } from '@repositories/SocialNetworkTypeRepository/ISocialNetworkTypeRepository';
import { AppError } from '@utils/AppError';
import { IUserRepository } from '@repositories/UserRepository/IUserRepository';
import { SocialNetworkType } from '@entities/SocialNetworkType/SocialNetworkType';
import { SocialNetwork } from '@entities/SocialNetwork/SocialNetwork';
import { ICreateSocialNetworkDTO } from './ICreateSocialNetworkDTO';

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
    type,
    user,
  }: ICreateSocialNetworkDTO): Promise<SocialNetwork> {
    let social: SocialNetwork | undefined;
    let socialType: SocialNetworkType | undefined;
    const foundUser = await this.userRepository.findById(user.id);

    if (!foundUser) {
      throw new AppError('Usuário não encontrado.', 404);
    }

    socialType = await this.socialNetworkTypeRepository.findByType(type);

    if (!socialType) {
      let base_url;
      if (type === 'instagram') base_url = 'instagram.com/';
      if (type === 'youtube') base_url = 'youtube.com/';
      if (type === 'tiktok') base_url = 'tiktok.com/@';
      if (type === 'twitter') base_url = 'twitter.com/';
      if (type === 'twitch') base_url = 'twitch.tv/';

      socialType = this.socialNetworkTypeRepository.create({
        id_social_network_type: v4(),
        type,
        base_url: base_url as string,
      });

      await this.socialNetworkTypeRepository.save(socialType);
    }

    social = foundUser.social_networks.find(
      userSocial => userSocial.type_id === socialType?.id_social_network_type,
    );

    if (social) {
      throw new AppError('Rede social já cadastrada.', 400);
    }

    social = this.socialNetworkRepository.create({
      id_social_network: v4(),
      username,
      type_id: socialType.id_social_network_type,
      user_id: user.id,
    });

    await this.socialNetworkRepository.save(social);

    return social;
  }
}

export { CreateSocialNetworkService };
