import { IParticipation } from '../../entities/Participation/IParticipation';
import { Participation } from '../../entities/Participation/Participation';

export interface IParticipationRepository {
  save(Participation: Participation): Promise<Participation>;
  create(data: IParticipation): Participation;
  findById(id: string): Promise<Participation | undefined>;
  findMod(
    user_id: string,
    event_id: string,
  ): Promise<Participation | undefined>;
  findIndex(): Promise<Participation[]>;
  findByUserAndEvent(
    user_id: string,
    event_id: string,
  ): Promise<Participation | undefined>;
  delete(id: string): Promise<void>;
  remove(entitie: Participation): Promise<void>;
}
