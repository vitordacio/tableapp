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
      id_social_network_type: data.id,
      name: data.name,
      count: data.count,
      base_url: data.base_url,
      deep_link: data.deep_link,
    });

    return socialType;
  }

  async save(social: SocialNetworkType): Promise<SocialNetworkType> {
    const newSocialNetworkType = await this.ormRepository.save(social);

    return newSocialNetworkType;
  }

  async findByName(name: string): Promise<SocialNetworkType | undefined> {
    const socialType = await this.ormRepository.findOne({
      where: { name },
    });

    return socialType;
  }

  async findById(id: string): Promise<SocialNetworkType | undefined> {
    const socialType = await this.ormRepository.findOne({
      where: { id_social_network_type: id },
    });

    return socialType;
  }

  async findIndex(): Promise<SocialNetworkType[]> {
    const socialType = await this.ormRepository.find({});

    return socialType;
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  async remove(entitie: SocialNetworkType): Promise<void> {
    await this.ormRepository.softRemove(entitie);
  }

  async saveMany(entities: SocialNetworkType[]): Promise<SocialNetworkType[]> {
    const newTypes = await this.ormRepository.save(entities);

    return newTypes;
  }
}

export { SocialNetworkTypeRepository };
