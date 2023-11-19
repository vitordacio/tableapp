// CREATE EXTENSION IF NOT EXISTS unaccent;
// CREATE EXTENSION IF NOT EXISTS pg_trgm;
import { Brackets, getRepository, Repository } from 'typeorm';
import { IUser } from '@entities/User/IUser';
import { User } from '@entities/User/User';
import { clearUsername } from '@utils/handleUser';
import { extractTagsFromText } from '@utils/generateTags';
import { IUserRepository } from '../IUserRepository';

const similarity = 0.3;

class UserRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  create(data: IUser): User {
    const user = this.ormRepository.create({
      id_user: data.id,
      email: data.email,
      username: data.username,
      password: data.password,
      name: data.name,
      bio: data.bio,
      location: data.location,
      gender: data.gender,
      friends_count: data.friends_count,
      emojis_count: data.emojis_count,
      picture: data.picture,
      cover_photo: data.cover_photo,
      private: data.private,
      locale: data.locale,
      CNPJ: data.CNPJ,
      role_name: data.role_name,
      google_id: data.google_id,
      tags: data.tags as unknown as string,
    });

    return user;
  }

  async save(user: User): Promise<User> {
    const newUser = await this.ormRepository.save(user);

    return newUser;
  }

  async saveMany(users: User[]): Promise<User[]> {
    const newUsers = await this.ormRepository.save(users);

    return newUsers;
  }

  async findIndex(): Promise<User[]> {
    const users = await this.ormRepository.find({
      order: { created_at: 'DESC' },
    });

    return users;
  }

  // async findByUsername(username: string): Promise<User | undefined> {
  //   const query = this.ormRepository.createQueryBuilder('user').where(
  //     new Brackets(qb => {
  //       qb.where('unaccent(LOWER(user.username)) ~~ unaccent(:query)', {
  //         query: username,
  //       });

  //       return qb;
  //     }),
  //   );

  //   const user = await query.getOne();

  //   return user;
  // }

  async findSearch(
    query: string,
    page: number,
    limit: number,
  ): Promise<User[]> {
    let tagName: string[] = [];
    if (query) tagName = extractTagsFromText(query);

    const conditions =
      tagName.length !== 0
        ? tagName
            .map(
              word =>
                `similarity(unaccent(LOWER(tag)), unaccent(lower('${word}'))) > ${similarity}`,
            )
            .join(' OR ')
        : null;

    const users = this.ormRepository
      .createQueryBuilder('user')
      .where(
        new Brackets(qb => {
          qb.where(
            `${
              conditions
                ? `EXISTS (SELECT 1 FROM unnest(user.tags) tag WHERE ${conditions})`
                : '(:nullName::text IS NULL OR EXISTS (SELECT 1 FROM unnest(user.tags) tag WHERE unaccent(LOWER(tag)) ~~ unaccent(:query)))'
            }`,
            {
              query: `%${query}%`,
              nullName: query,
            },
          );

          return qb;
        }),
      )
      .select([
        'user.id_user',
        'user.name',
        'user.username',
        'user.picture',
        `(SELECT count(*) FROM unnest(user.tags) as tag WHERE ${conditions}) as qtd`,
      ])
      .orderBy('qtd', 'DESC')
      .take(limit)
      .skip(page && limit ? limit * (page - 1) : undefined)
      .getMany();

    return users;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository
      .createQueryBuilder('user')
      .where('LOWER(user.email) = :query', {
        query: email.toLowerCase().trim(),
      })
      .getOne();

    return user;
  }

  async findByUsername(username: string): Promise<User | undefined> {
    const user = await this.ormRepository
      .createQueryBuilder('user')
      .where('LOWER(user.username) = :query', {
        query: clearUsername(username),
      })
      .getOne();

    return user;
  }

  async findByGoogleId(google_id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      // relations: ['permissions', 'vehicles', 'address'],
      where: { google_id },
    });

    return user;
  }

  async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      relations: ['social_networks', 'social_networks.type'],
      where: { id_user: id },
    });

    return user;
  }

  async findByRole(role: string): Promise<User[]> {
    const users = await this.ormRepository.find({
      where: { role_name: role },
    });

    return users;
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  async remove(entitie: User): Promise<void> {
    await this.ormRepository.softRemove(entitie);
  }
}

export { UserRepository };
