import { IReact } from '@entities/React/IReact';
import { React } from '@entities/React/React';

export interface IReactRepository {
  save(entitie: React): Promise<React>;
  create(data: IReact): React;
  findById(id: string): Promise<React | undefined>;
  findReactUser(
    author_id: string,
    receiver_id: string,
  ): Promise<React | undefined>;
  findReactEvent(
    author_id: string,
    event_id: string,
  ): Promise<React | undefined>;
  findByUserId(user_id: string, page: number, limit: number): Promise<React[]>;
  findReceivedsByUserId(
    user_id: string,
    page: number,
    limit: number,
  ): Promise<React[]>;
  findReceivedsByEventId(
    event_id: string,
    page: number,
    limit: number,
  ): Promise<React[]>;
  findByUserIdAndName(
    id: string,
    page: number,
    limit: number,
    name: string,
  ): Promise<React[]>;
  findToRemove(id: string): Promise<React | undefined>;
  remove(entitie: React): Promise<void>;
}
