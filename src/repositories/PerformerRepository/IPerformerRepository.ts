import { IPerformer } from '@entities/Performer/IPerformer';
import { Performer } from '@entities/Performer/Performer';

export interface IPerformerRepository {
  create(data: IPerformer): Performer;
  save(entitie: Performer): Promise<Performer>;
  saveMany(entities: Performer[]): Promise<Performer[]>;
  findById(id: string): Promise<Performer | undefined>;
  findByEventId(event_id: string): Promise<Performer[]>;
  remove(entitie: Performer): Promise<void>;
}
