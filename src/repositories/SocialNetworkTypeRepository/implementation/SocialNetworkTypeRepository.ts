// import { Brackets, getRepository, Repository } from 'typeorm';
import { getRepository, Repository } from 'typeorm';
import { ISocialNetworkType } from '@entities/SocialNetworkType/ISocialNetworkType';
import { SocialNetworkType } from '@entities/SocialNetworkType/SocialNetworkType';
import { ISocialNetworkTypeRepository } from '../ISocialNetworkTypeRepository';

class SocialNetworkTypeRepository implements ISocialNetworkTypeRepository {
  private ormRepository: Repository<SocialNetworkType>;

  constructor() {
    this.ormRepository = getRepository(SocialNetworkType);
  }

  create(data: ISocialNetworkType): SocialNetworkType {
    const socialType = this.ormRepository.create({
      id_social_network_type: data.id_social_network_type,
      type: data.type,
      base_url: data.base_url,
    });

    return socialType;
  }

  async save(social: SocialNetworkType): Promise<SocialNetworkType> {
    const newSocialNetworkType = await this.ormRepository.save(social);

    return newSocialNetworkType;
  }

  async findByType(type: string): Promise<SocialNetworkType | undefined> {
    const socialType = await this.ormRepository.findOne({
      where: { type },
    });

    return socialType;
  }

  async findById(id: string): Promise<SocialNetworkType | undefined> {
    const socialType = await this.ormRepository.findOne({
      where: { id_social_network_type: id },
    });

    return socialType;
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  async remove(entitie: SocialNetworkType): Promise<void> {
    await this.ormRepository.softRemove(entitie);
  }
}

export { SocialNetworkTypeRepository };
