import { IEventType } from '@entities/EventType/IEventType';
import { EventType } from '@entities/EventType/EventType';

export interface IEventTypeRepository {
  save(entitie: EventType): Promise<EventType>;
  create(data: IEventType): EventType;
  findByName(name: string): Promise<EventType | undefined>;
  findById(id: string): Promise<EventType | undefined>;
  findIndex(): Promise<EventType[]>;
  delete(id: string): Promise<void>;
  remove(entitie: EventType): Promise<void>;
}
