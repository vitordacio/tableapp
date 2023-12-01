import { IParticipationType } from '@entities/ParticipationType/IParticipationType';
import { ParticipationType } from '@entities/ParticipationType/ParticipationType';

export interface IParticipationTypeRepository {
  save(entitie: ParticipationType): Promise<ParticipationType>;
  create(data: IParticipationType): ParticipationType;
  findByName(name: string): Promise<ParticipationType | undefined>;
  findById(id: string): Promise<ParticipationType | undefined>;
  findIndex(): Promise<ParticipationType[]>;
  delete(id: string): Promise<void>;
  remove(entitie: ParticipationType): Promise<void>;
  saveMany(entities: ParticipationType[]): Promise<ParticipationType[]>;
}
