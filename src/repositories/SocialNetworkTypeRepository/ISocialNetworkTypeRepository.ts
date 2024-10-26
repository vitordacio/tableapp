import { ISocialNetworkType } from '@entities/SocialNetworkType/ISocialNetworkType';
import { SocialNetworkType } from '@entities/SocialNetworkType/SocialNetworkType';

export interface ISocialNetworkTypeRepository {
  save(entitie: SocialNetworkType): Promise<SocialNetworkType>;
  create(data: ISocialNetworkType): SocialNetworkType;
  findByName(name: string): Promise<SocialNetworkType | undefined>;
  findById(id: string): Promise<SocialNetworkType | undefined>;
  findIndex(): Promise<SocialNetworkType[]>;
  delete(id: string): Promise<void>;
  remove(entitie: SocialNetworkType): Promise<void>;
  saveMany(entities: SocialNetworkType[]): Promise<SocialNetworkType[]>;
}
