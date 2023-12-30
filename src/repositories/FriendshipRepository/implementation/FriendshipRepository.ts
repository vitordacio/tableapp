// import { Brackets, getRepository, Repository } from 'typeorm';
import { Brackets, getRepository, Repository } from 'typeorm';
import { IFriendship } from '@entities/Friendship/IFriendship';
import { Friendship } from '@entities/Friendship/Friendship';
// import { extractTagsFromText } from '@utils/generateTags';
import { extractTagsFromText } from '@utils/generateTags';
import { IFriendshipRepository } from '../IFriendshipRepository';

const similarity = 0.3;

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

  async findFriendsByUserIdAndName(
    id: string,
    page: number,
    limit: number,
    name: string,
  ): Promise<Friendship[]> {
    let tagName: string[] = [];
    tagName = extractTagsFromText(name);

    const conditions =
      tagName.length !== 0
        ? tagName
            .map(
              word =>
                `similarity(unaccent(LOWER(tag)), unaccent(lower('${word}'))) > ${similarity}`,
            )
            .join(' OR ')
        : null;

    const friendships = await this.ormRepository
      .createQueryBuilder('friendship')
      .leftJoinAndSelect('friendship.author', 'author')
      .leftJoinAndSelect('friendship.receiver', 'receiver')
      .where('friendship.confirmed = true')
      .andWhere(
        new Brackets(qb => {
          qb.where(
            `${
              conditions
                ? `((friendship.author_id = :user_id AND EXISTS (SELECT 1 FROM unnest(receiver.tags) tag WHERE ${conditions})) OR (friendship.receiver_id = :user_id AND EXISTS (SELECT 1 FROM unnest(author.tags) tag WHERE ${conditions})))`
                : '(friendship.receiver_id = :user_id AND (:nullName::text IS NULL OR EXISTS (SELECT 1 FROM unnest(author.tags) tag WHERE unaccent(LOWER(tag)) ~~ unaccent(:query)))) OR (friendship.author_id = :user_id AND (:nullName::text IS NULL OR EXISTS (SELECT 1 FROM unnest(receiver.tags) tag WHERE unaccent(LOWER(tag)) ~~ unaccent(:query))))'
            }`,
            {
              user_id: id,
              query: `%${name}%`,
              nullName: name,
            },
          );

          return qb;
        }),
      )
      .select(['friendship.id_friendship', 'author', 'receiver'])
      .addSelect(
        `(SELECT count(*) FROM unnest(author.tags) as tag WHERE ${conditions}) +
         (SELECT count(*) FROM unnest(receiver.tags) as tag WHERE ${conditions})`,
        'qtd',
      )
      .orderBy('qtd', 'DESC')
      .take(limit)
      .skip((page - 1) * limit)
      .getMany();

    return friendships;
  }

  async findLatestByUserId(
    id: string,
    page: number,
    limit: number,
  ): Promise<Friendship[]> {
    const friendships = await this.ormRepository
      .createQueryBuilder('friendship')
      .leftJoinAndSelect('friendship.author', 'author')
      .leftJoinAndSelect('friendship.receiver', 'receiver')
      .where(
        '(friendship.author_id = :user_id OR friendship.receiver_id = :user_id) AND friendship.confirmed = true',
        {
          user_id: id,
        },
      )
      .select([
        'friendship.id_friendship',
        'author',
        'receiver',
        'friendship.created_at',
      ])
      .orderBy('friendship.created_at', 'DESC')
      .take(limit)
      .skip((page - 1) * limit)
      .getMany();
    return friendships;
  }

  async checkFriends(
    user_id: string,
    friend_ids: string[],
  ): Promise<Friendship[]> {
    const friendships = await this.ormRepository
      .createQueryBuilder('friendship')
      // .leftJoinAndSelect('friendship.author', 'author')
      // .leftJoinAndSelect('friendship.receiver', 'receiver')
      .leftJoin('friendship.author', 'author')
      .leftJoin('friendship.receiver', 'receiver')
      .where(
        '(friendship.author_id = :user_id AND friendship.receiver_id IN(:...friend_ids)) OR (friendship.author_id IN(:...friend_ids) AND friendship.receiver_id = :user_id)',
        {
          user_id,
          friend_ids,
        },
      )
      // .select([
      //   'friendship.id_friendship',
      //   'friendship.confirmed',
      //   'author',
      //   'receiver',
      // ])
      .getMany();

    return friendships;
  }

  async findByUserIds(
    user_id: string,
    friend_id: string,
  ): Promise<Friendship | undefined> {
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

  async findToRemove(
    user_id: string,
    friend_id: string,
  ): Promise<Friendship | undefined> {
    const friendship = await this.ormRepository
      .createQueryBuilder('friendship')
      .leftJoinAndSelect('friendship.author', 'author')
      .leftJoinAndSelect('friendship.receiver', 'receiver')
      .leftJoinAndSelect('friendship.notifications', 'notifications')
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
