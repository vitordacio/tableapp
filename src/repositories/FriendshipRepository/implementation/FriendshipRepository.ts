// import { Brackets, getRepository, Repository } from 'typeorm';
import { getRepository, Repository } from 'typeorm';
import { IFriendship } from '@entities/Friendship/IFriendship';
import { Friendship } from '@entities/Friendship/Friendship';
import { IFriendshipRepository } from '../IFriendshipRepository';

class FriendshipRepository implements IFriendshipRepository {
  private ormRepository: Repository<Friendship>;

  constructor() {
    this.ormRepository = getRepository(Friendship);
  }

  create(data: IFriendship): Friendship {
    const friendship = this.ormRepository.create({
      id_friendship: data.id,
      sender: data.sender,
      receiver: data.receiver,
      accepted: data.accepted,
    });

    return friendship;
  }

  async save(friendship: Friendship): Promise<Friendship> {
    const newFriendship = await this.ormRepository.save(friendship);

    return newFriendship;
  }

  async findById(id: string): Promise<Friendship | undefined> {
    const friendship = await this.ormRepository.findOne({
      relations: ['sender', 'receiver'],
      where: { id_friendship: id },
    });

    return friendship;
  }

  async findBySenderAndReceiver(
    sender_id: string,
    receiver_id: string,
  ): Promise<Friendship | undefined> {
    const friendship = await this.ormRepository.findOne({
      where: { sender_id, receiver_id },
    });

    return friendship;
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  async remove(entitie: Friendship): Promise<void> {
    await this.ormRepository.softRemove(entitie);
  }
}

export { FriendshipRepository };
