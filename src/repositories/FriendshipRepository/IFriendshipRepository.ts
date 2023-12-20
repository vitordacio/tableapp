import { IFriendship } from '../../entities/Friendship/IFriendship';
import { Friendship } from '../../entities/Friendship/Friendship';

export interface IFriendshipRepository {
  save(friendship: Friendship): Promise<Friendship>;
  create(data: IFriendship): Friendship;
  findById(id: string): Promise<Friendship | undefined>;
  findByUserIds(
    user_id: string,
    friend_id: string,
  ): Promise<Friendship | undefined>;
  findFriendsByUserIdAndName(
    id: string,
    page: number,
    limit: number,
    name: string,
  ): Promise<Friendship[]>;
  checkFriends(user_id: string, friend_ids: string[]): Promise<Friendship[]>;
  findLatestByUserId(
    id: string,
    page: number,
    limit: number,
  ): Promise<Friendship[]>;
  delete(id: string): Promise<void>;
  findToRemove(
    user_id: string,
    friend_id: string,
  ): Promise<Friendship | undefined>;
  remove(entitie: Friendship): Promise<void>;
}
