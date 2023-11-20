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
import { ISocialNetworkTypeRepository } from '@repositories/SocialNetworkTypeRepository/ISocialNetworkTypeRepository';
import { AppError } from '@utils/AppError';
import { SocialNetworkType } from '@entities/SocialNetworkType/SocialNetworkType';
import { ICreateSocialNetworkTypeDTO } from './ICreateSocialNetworkTypeDTO';

@injectable()
class CreateSocialNetworkTypeService {
  constructor(
    @inject('SocialNetworkTypeRepository')
    private socialNetworkTypeRepository: ISocialNetworkTypeRepository,
  ) {}

  async execute({
    base_url,
    deep_link,
    type,
  }: ICreateSocialNetworkTypeDTO): Promise<SocialNetworkType> {
    let socialType: SocialNetworkType | undefined;

    socialType = await this.socialNetworkTypeRepository.findByType(type);

    if (socialType) {
      throw new AppError('Tipo de rede social já cadastrada.', 400);
    }

    if (!socialType) {
      socialType = this.socialNetworkTypeRepository.create({
        id_social_network_type: v4(),
        type,
        base_url,
        deep_link,
      });
    }
    await this.socialNetworkTypeRepository.save(socialType);

    return socialType;
  }
}

export { CreateSocialNetworkTypeService };
