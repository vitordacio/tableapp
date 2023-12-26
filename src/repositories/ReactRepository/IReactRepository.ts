import { IReact } from '@entities/React/IReact';
import { React } from '@entities/React/React';

export interface IReactRepository {
  save(event: React): Promise<React>;
  create(data: IReact): React;
  findById(id: string): Promise<React | undefined>;
  findToRemove(id: string): Promise<React | undefined>;
  remove(entitie: React): Promise<void>;
}
