// import { Brackets, getRepository, Repository } from 'typeorm';
import { getRepository, Repository } from 'typeorm';
import { IFriendship } from '@entities/Friendship/IFriendship';
import { Friendship } from '@entities/Friendship/Friendship';
// import { extractTagsFromText } from '@utils/generateTags';
import { IFriendshipRepository } from '../IFriendshipRepository';

// const similarity = 0.5;

class FriendshipRepository implements IFriendshipRepository {
  private ormRepository: Repository<Friendship>;

  constructor() {
    this.ormRepository = getRepository(Friendship);
  }

  create(data: IFriendship): Friendship {
    const friendship = this.ormRepository.create({
      id_friendship: data.id,
      author_id: data.author_id,
      receiver_id: data.receiver_id,
    });

    return friendship;
  }

  async save(friendship: Friendship): Promise<Friendship> {
    const newFriendship = await this.ormRepository.save(friendship);

    return newFriendship;
  }

  async findById(id: string): Promise<Friendship | undefined> {
    const friendship = await this.ormRepository.findOne({
      relations: ['author', 'receiver'],
      where: { id_friendship: id },
    });

    return friendship;
  }

  async findFriends(
    id: string,
    page: number,
    limit: number,
    // query: string,
  ): Promise<Friendship[]> {
    // let tagName: string[] = [];
    // if (query) tagName = extractTagsFromText(query);

    // const conditions =
    //   tagName.length !== 0
    //     ? tagName
    //         .map(
    //           word =>
    //             `similarity(unaccent(LOWER(tag)), unaccent(lower('${word}'))) > ${similarity}`,
    //         )
    //         .join(' OR ')
    //     : `''::text IS NULL`;

    const friendships = await this.ormRepository
      .createQueryBuilder('friendship')
      .leftJoinAndSelect('friendship.author', 'author')
      .leftJoinAndSelect('friendship.receiver', 'receiver')
      .where('friendship.confirmed = true')
      .andWhere(
        '(friendship.author_id = :user_id OR friendship.receiver_id = :user_id)',
        {
          user_id: id,
        },
      )
      // .andWhere(
      //   `EXISTS (SELECT 1 FROM unnest(author.tags) tag WHERE ${conditions}) OR EXISTS (SELECT 1 FROM unnest(receiver.tags) tag WHERE ${conditions}) `,
      // )
      // .addSelect(
      //   `(SELECT count(*) FROM unnest(author.tags) as tag WHERE ${conditions}) as qtd1`,
      //   `(SELECT count(*) FROM unnest(receiver.tags) as tag WHERE ${conditions}) as qtd2`,
      // )
      // .orderBy('qtd1', 'DESC')
      // .addOrderBy('qtd2', 'DESC')
      .take(limit)
      .skip((page - 1) * limit)
      .getMany();

    return friendships;
  }

  async checkFriends(
    user_id: string,
    friend_ids: string[],
  ): Promise<Friendship[]> {
    const friendship = await this.ormRepository
      .createQueryBuilder('friendship')
      .leftJoinAndSelect('friendship.author', 'author')
      .leftJoinAndSelect('friendship.receiver', 'receiver')
      .where('friendship.confirmed = true')
      .andWhere(
        '(friendship.author_id = :user_id AND friendship.receiver_id IN(:friend_ids)) OR (friendship.author_id IN(:friend_ids) AND friendship.receiver_id = :user_id)',
        {
          user_id,
          friend_ids,
        },
      )
      .getMany();

    return friendship;
  }

  async findByUserIds(
    user_id: string,
    friend_id: string,
  ): Promise<Friendship | undefined> {
    // const queryBuilder = this.ormRepository.createQueryBuilder('friendship');

    const friendship = await this.ormRepository
      .createQueryBuilder('friendship')
      .leftJoinAndSelect('friendship.author', 'author')
      .leftJoinAndSelect('friendship.receiver', 'receiver')
      .where(
        '(friendship.author_id = :user_id AND friendship.receiver_id = :friend_id) OR (friendship.author_id = :friend_id AND friendship.receiver_id = :user_id)',
        {
          user_id,
          friend_id,
        },
      )
      .getOne();

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
