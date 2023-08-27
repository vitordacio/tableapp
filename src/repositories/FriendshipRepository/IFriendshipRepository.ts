import { IFriendship } from '../../entities/Friendship/IFriendship';
import { Friendship } from '../../entities/Friendship/Friendship';

export interface IFriendshipRepository {
  save(friendship: Friendship): Promise<Friendship>;
  create(data: IFriendship): Friendship;
  findById(id: string): Promise<Friendship | undefined>;
  findBySenderAndReceiver(
    sender_id: string,
    receiver_id: string,
  ): Promise<Friendship | undefined>;
  delete(id: string): Promise<void>;
  remove(entitie: Friendship): Promise<void>;
}
