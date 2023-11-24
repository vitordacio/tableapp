import { inject, injectable } from 'tsyringe';
import { ISocialNetworkTypeRepository } from '@repositories/SocialNetworkTypeRepository/ISocialNetworkTypeRepository';
import { SocialNetworkType } from '@entities/SocialNetworkType/SocialNetworkType';

@injectable()
class FindSocialNetworkTypesService {
  constructor(
    @inject('SocialNetworkTypeRepository')
    private socialNetworkTypeRepository: ISocialNetworkTypeRepository,
  ) {}

  async execute(): Promise<SocialNetworkType[]> {
    const socialTypes = await this.socialNetworkTypeRepository.findIndex();

    return socialTypes;
  }
}

export { FindSocialNetworkTypesService };
