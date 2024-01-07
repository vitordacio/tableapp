import { IMoment } from '@entities/Moment/IMoment';
import { Moment } from '@entities/Moment/Moment';

export interface IMomentRepository {
  save(block: Moment): Promise<Moment>;
  create(data: IMoment): Moment;
  findById(id: string): Promise<Moment | undefined>;
  findByEventId(
    event_id: string,
    page: number,
    limit: number,
  ): Promise<Moment[]>;
  remove(entitie: Moment): Promise<void>;
}
