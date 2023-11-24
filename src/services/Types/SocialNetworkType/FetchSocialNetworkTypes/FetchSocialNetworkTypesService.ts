import { inject, injectable } from 'tsyringe';
import { v4 } from 'uuid';
import { SocialNetworkType } from '@entities/SocialNetworkType/SocialNetworkType';
import { ISocialNetworkTypeRepository } from '@repositories/SocialNetworkTypeRepository/ISocialNetworkTypeRepository';

@injectable()
class FetchSocialNetworkTypesService {
  constructor(
    @inject('SocialNetworkTypeRepository')
    private socialNetworkTypeRepository: ISocialNetworkTypeRepository,
  ) {}

  async execute(): Promise<SocialNetworkType[]> {
    const fetchData = [
      {
        name: 'instagram',
        base_url: 'https://instagram.com/',
        deep_link: 'instagram://user?username=',
      },
      {
        name: 'youtube',
        base_url: 'https://youtube.com/',
        deep_link: 'youtube://www.youtube.com/user/',
      },
      {
        name: 'twitter',
        base_url: 'https://twitter.com/',
        deep_link: 'twitter://user?screen_name=',
      },
      {
        name: 'tiktok',
        base_url: 'https://tiktok.com/@',
        deep_link: 'tiktok://user/',
      },
      {
        name: 'twitch',
        base_url: 'https://twitch.tv/',
        deep_link: 'twitch://',
      },
    ];

    const newTypes: SocialNetworkType[] = [];

    const types = await this.socialNetworkTypeRepository.findIndex();

    fetchData.forEach(data => {
      const alreadyExists = types.some(type => type.name === data.name);

      if (alreadyExists) return;

      const newType = this.socialNetworkTypeRepository.create({
        id: v4(),
        name: data.name,
        base_url: data.base_url,
        deep_link: data.deep_link,
      });

      newTypes.push(newType);
    });

    await this.socialNetworkTypeRepository.saveMany(newTypes);

    return newTypes;
  }
}

export { FetchSocialNetworkTypesService };
