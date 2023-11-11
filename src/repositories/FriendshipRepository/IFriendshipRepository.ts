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
  findFriends(id: string, page?: number, limit?: number): Promise<Friendship[]>;
  delete(id: string): Promise<void>;
  remove(entitie: Friendship): Promise<void>;
}
