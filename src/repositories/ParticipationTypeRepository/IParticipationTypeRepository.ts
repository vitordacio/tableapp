import { IParticipationType } from '../../entities/ParticipationType/IParticipationType';
import { ParticipationType } from '../../entities/ParticipationType/ParticipationType';

export interface IParticipationTypeRepository {
  save(participation: ParticipationType): Promise<ParticipationType>;
  create(data: IParticipationType): ParticipationType;
  findById(id: string): Promise<ParticipationType | undefined>;
  findIndex(): Promise<ParticipationType[]>;
  findByType(type: string): Promise<ParticipationType | undefined>;
  delete(id: string): Promise<void>;
  remove(entitie: ParticipationType): Promise<void>;
}
