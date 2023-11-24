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
    name,
  }: ICreateSocialNetworkTypeDTO): Promise<SocialNetworkType> {
    let socialType: SocialNetworkType | undefined;

    socialType = await this.socialNetworkTypeRepository.findByName(name);

    if (socialType) {
      throw new AppError('Tipo de rede social já cadastrada.', 400);
    }

    if (!socialType) {
      socialType = this.socialNetworkTypeRepository.create({
        id: v4(),
        name,
        base_url,
        deep_link,
      });
    }

    await this.socialNetworkTypeRepository.save(socialType);

    return socialType;
  }
}

export { CreateSocialNetworkTypeService };
