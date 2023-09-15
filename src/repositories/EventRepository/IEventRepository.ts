import { IEvent } from '../../entities/Event/IEvent';
import { Event } from '../../entities/Event/Event';

export interface IEventRepository {
  save(event: Event): Promise<Event>;
  create(data: IEvent): Event;
  findById(id: string): Promise<Event | undefined>;
  findIndexByType(type: string): Promise<Event[]>;
  findIndex(): Promise<Event[]>;
  findByCoordinates(
    lat: number,
    long: number,
    radius?: number,
  ): Promise<Event[]>;
  findClosest(lat: number, long: number): Promise<Event[]>;
  delete(id: string): Promise<void>;
  remove(entitie: Event): Promise<void>;
  // findByCoordinates(
  //   lat: number,
  //   long: number,
  //   radius: number,
  //   services?: string,
  // ): Promise<Workshop[]>;
  // findClosest(
  //   lat: number,
  //   long: number,
  //   services?: string,
  // ): Promise<Workshop[]>;
}
