import { inject, injectable } from 'tsyringe';

import { AppError } from '@utils/AppError';
import { ISocialNetworkRepository } from '@repositories/SocialNetworkRepository/ISocialNetworkRepository';

@injectable()
class DeleteSocialNetworkTypeService {
  constructor(
    @inject('SocialNetworkRepository')
    private socialNetworkRepository: ISocialNetworkRepository,
  ) {}

  async execute(social_network_id: string): Promise<void> {
    const socialType = await this.socialNetworkRepository.findById(
      social_network_id,
    );

    if (!socialType) {
      throw new AppError('Tipo de rede social não encontrada.', 404);
    }

    await this.socialNetworkRepository.remove(socialType);
  }
}

export { DeleteSocialNetworkTypeService };
