import { inject, injectable } from 'tsyringe';
import { v4 } from 'uuid';
import socialNetworkType from '@config/fetch/socialNetworkType';
import { SocialNetworkType } from '@entities/SocialNetworkType/SocialNetworkType';
import { ISocialNetworkTypeRepository } from '@repositories/SocialNetworkTypeRepository/ISocialNetworkTypeRepository';

@injectable()
class FetchSocialNetworkTypesService {
  constructor(
    @inject('SocialNetworkTypeRepository')
    private socialNetworkTypeRepository: ISocialNetworkTypeRepository,
  ) {}

  async execute(): Promise<SocialNetworkType[]> {
    const newTypes: SocialNetworkType[] = [];

    const types = await this.socialNetworkTypeRepository.findIndex();

    socialNetworkType.forEach(data => {
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
