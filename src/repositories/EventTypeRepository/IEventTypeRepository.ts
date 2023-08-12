import { IEventType } from '../../entities/EventType/IEventType';
import { EventType } from '../../entities/EventType/EventType';

export interface IEventTypeRepository {
  save(event: EventType): Promise<EventType>;
  create(data: IEventType): EventType;
  findById(id: string): Promise<EventType | undefined>;
  findIndex(): Promise<EventType[]>;
  findByType(type: string): Promise<EventType | undefined>;
  delete(id: string): Promise<void>;
  remove(entitie: EventType): Promise<void>;
}
