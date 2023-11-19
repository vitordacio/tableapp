// import { Brackets, getRepository, Repository } from 'typeorm';
import { getRepository, Repository } from 'typeorm';
import { ISocialNetwork } from '@entities/SocialNetwork/ISocialNetwork';
import { SocialNetwork } from '@entities/SocialNetwork/SocialNetwork';
import { ISocialNetworkRepository } from '../ISocialNetworkRepository';

class SocialNetworkRepository implements ISocialNetworkRepository {
  private ormRepository: Repository<SocialNetwork>;

  constructor() {
    this.ormRepository = getRepository(SocialNetwork);
  }

  create(data: ISocialNetwork): SocialNetwork {
    const social = this.ormRepository.create({
      id_social_network: data.id_social_network,
      username: data.username,
      type_id: data.type_id,
      user_id: data.user_id,
    });

    return social;
  }

  async save(social: SocialNetwork): Promise<SocialNetwork> {
    const newSocialNetwork = await this.ormRepository.save(social);

    return newSocialNetwork;
  }

  async findByUser(user_id: string): Promise<SocialNetwork[]> {
    const socials = await this.ormRepository.find({
      relations: ['type'],
      where: { user_id },
    });

    return socials;
  }

  async findById(id: string): Promise<SocialNetwork | undefined> {
    const social = await this.ormRepository.findOne({
      relations: ['user', 'type'],
      where: { id_social_network: id },
    });

    return social;
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  async remove(entitie: SocialNetwork): Promise<void> {
    await this.ormRepository.softRemove(entitie);
  }
}

export { SocialNetworkRepository };
