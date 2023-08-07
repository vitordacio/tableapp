import { IParticipationType } from '../../entities/ParticipationType/IParticipationType';
import { ParticipationType } from '../../entities/ParticipationType/ParticipationType';

export interface IParticipationTypeRepository {
  save(ParticipationType: ParticipationType): Promise<ParticipationType>;
  create(data: IParticipationType): ParticipationType;
  findById(id: string): Promise<ParticipationType | undefined>;
  findByUserAndEvent(
    user_id: string,
    event_id: string,
  ): Promise<ParticipationType | undefined>;
  delete(id: string): Promise<void>;
}
