import { ISocialNetwork } from '@entities/SocialNetwork/ISocialNetwork';
import { SocialNetwork } from '@entities/SocialNetwork/SocialNetwork';

export interface ISocialNetworkRepository {
  save(entitie: SocialNetwork): Promise<SocialNetwork>;
  create(data: ISocialNetwork): SocialNetwork;
  findByUser(user_id: string): Promise<SocialNetwork[]>;
  findById(id: string): Promise<SocialNetwork | undefined>;
  delete(id: string): Promise<void>;
  remove(entitie: SocialNetwork): Promise<void>;
}
