import { IParticipation } from '@entities/Participation/IParticipation';
import { Participation } from '@entities/Participation/Participation';

export interface IParticipationRepository {
  save(participation: Participation): Promise<Participation>;
  create(data: IParticipation): Participation;
  findById(id: string): Promise<Participation | undefined>;
  checkMod(
    user_id: string,
    event_id: string,
  ): Promise<Participation | undefined>;
  findIndex(): Promise<Participation[]>;
  findByEventId(
    event_id: string,
    page: number,
    limit: number,
  ): Promise<Participation[]>;
  findRequestsPending(
    event_id: string,
    page: number,
    limit: number,
  ): Promise<Participation[]>;
  findRequestsReviwed(
    event_id: string,
    page: number,
    limit: number,
  ): Promise<Participation[]>;
  findByUserId(
    user_id: string,
    page: number,
    limit: number,
  ): Promise<Participation[]>;
  findByUserAndEvent(
    user_id: string,
    event_id: string,
  ): Promise<Participation | undefined>;
  delete(id: string): Promise<void>;
  findToRemove(id: string): Promise<Participation | undefined>;
  checkUserParticipations(
    user_id: string,
    event_ids: string[],
  ): Promise<Participation[]>;
  remove(entitie: Participation): Promise<void>;
}
