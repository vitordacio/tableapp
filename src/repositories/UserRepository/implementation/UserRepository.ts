// CREATE EXTENSION IF NOT EXISTS unaccent;
// CREATE EXTENSION IF NOT EXISTS pg_trgm;
import { getRepository, Repository } from 'typeorm';
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
        : `''::text IS NULL`;

    const users = this.ormRepository
      .createQueryBuilder('user')
      .where(`EXISTS (SELECT 1 FROM unnest(user.tags) tag WHERE ${conditions})`)
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
      where: { id_user: id },
    });

    return user;
  }

  // findByDocument(doc: string, roleName: string): Promise<User | undefined> {
  //   const user = this.ormRepository
  //     .createQueryBuilder('user')
  //     .where('(user.role_name = :roleName OR :nullRole::text IS NULL)', {
  //       roleName,
  //       nullRole: roleName,
  //     })
  //     .andWhere({ document: doc })
  //     .getOne();
  //   return user;
  // }

  // async findByPhone(
  //   phone: string,
  //   roleName: string,
  // ): Promise<User | undefined> {
  //   const user = await this.ormRepository
  //     .createQueryBuilder('user')
  //     .where('(user.role_name = :roleName OR :nullRole::text IS NULL)', {
  //       roleName,
  //       nullRole: roleName,
  //     })
  //     .andWhere('user.phone = :phone', { phone })
  //     .getOne();

  //   return user;
  // }

  // async findByWorkshop(
  //   workshopId: string,
  //   initialDate?: string,
  //   finalDate?: string,
  // ): Promise<Transaction[]> {
  //   const queryBuilder = this.ormRepository
  //     .createQueryBuilder('transaction')
  //     .where('transaction.workshop_id = :id', {
  //       id: workshopId,
  //     });

  //   if (initialDate && finalDate) {
  //     queryBuilder
  //       .andWhere(
  //         '( :nullInitialDate::text IS NULL OR :initialDate <= transaction.due_date )',
  //         { nullInitialDate: initialDate, initialDate },
  //       )
  //       .andWhere(
  //         '( :nullFinalDate::text IS NULL OR :finalDate >= transaction.due_date )',
  //         {
  //           nullFinalDate: finalDate,
  //           finalDate,
  //         },
  //       );
  //   } else if (initialDate) {
  //     queryBuilder.andWhere(
  //       '( :nullInitialDate::text IS NULL OR :initialDate <= transaction.due_date )',
  //       { nullInitialDate: initialDate, initialDate },
  //     );
  //   } else if (finalDate) {
  //     queryBuilder.andWhere(
  //       '( :nullFinalDate::text IS NULL OR :finalDate >= transaction.due_date )',
  //       {
  //         nullFinalDate: finalDate,
  //         finalDate,
  //       },
  //     );
  //   }

  //   const transactions = await queryBuilder
  //     .select([
  //       'transaction.total',
  //       'transaction.due_date',
  //       'transaction.type',
  //       'transaction.finished',
  //     ])
  //     .getMany();

  //   return transactions;
  // }

  // async findByWorkshop(
  //   workshopId: string,
  //   page: number,
  //   limit: number,
  // ): Promise<Repair[]> {
  //   const repairs = await this.ormRepository.find({
  //     relations: [
  //       'vehicle',
  //       'user_workshop',
  //       'user_workshop.user',
  //       'checklist',
  //       'checklist.banners',
  //     ],
  //     order: {
  //       finished: 'ASC',
  //       finish_date: 'DESC',
  //       finish_time: 'DESC',
  //       updated_at: 'DESC',
  //     },
  //     where: { workshop_id: workshopId },
  //     take: limit,
  //     skip: page && limit ? limit * (page - 1) : undefined,
  //   });

  //   return repairs;
  // }

  // async findByCoordinates(
  //   lat: number,
  //   long: number,
  //   radius: number,
  //   services?: string,
  // ): Promise<Workshop[]> {
  //   const workshops = await this.ormRepository
  //     .createQueryBuilder('workshop')
  //     .leftJoinAndSelect('workshop.address', 'address')
  //     .leftJoinAndSelect('workshop.child_services', 'services')
  //     .leftJoinAndSelect('services.service', 'masterservices')
  //     .leftJoinAndSelect(
  //       'workshop.partners',
  //       'partners',
  //       'partners.active = true',
  //     )
  //     .leftJoinAndSelect(
  //       'workshop.banners',
  //       'banners',
  //       'banners.type = :type',
  //       { type: 'profile' },
  //     )
  //     .leftJoinAndSelect('partners.address', 'partner_address')
  //     .where(
  //       `(6371 * acos( cos(radians(address.lat)) * cos(radians(${lat})) * cos(radians(address.long) - radians(${long})) + sin(radians(address.lat)) * sin(radians(${lat})))) <= ${radius}`,
  //     )
  //     .andWhere(
  //       new Brackets(qb => {
  //         qb.where(
  //           '(:nullService::text IS NULL OR unaccent(LOWER(services.name)) ~~ unaccent(:queryServices) OR unaccent(LOWER(workshop.fantasy_name)) ~~ unaccent(:workshopName))',
  //           {
  //             queryServices: `%${services}%`,
  //             workshopName: `%${services}%`,
  //             nullService: services,
  //           },
  //         );

  //         qb.andWhere('workshop.active = true');

  //         return qb;
  //       }),
  //     )
  //     .getMany();

  //   return workshops;
  // }

  // async findClosest(
  //   lat: number,
  //   long: number,
  //   services?: string,
  // ): Promise<Workshop[]> {
  //   const subQuery = `SELECT (6371 * acos( cos(radians(addresses.lat)) * cos(radians(${lat})) * cos(radians(addresses.long) - radians(${long})) + sin(radians(addresses.lat)) * sin(radians(${lat})))) AS distance FROM workshops LEFT JOIN addresses ON workshops.address_id = addresses.id_address WHERE workshops.id_workshop = workshop.id_workshop`;

  //   const workshops = await this.ormRepository
  //     .createQueryBuilder('workshop')
  //     .leftJoinAndSelect('workshop.address', 'address')
  //     .leftJoinAndSelect('workshop.child_services', 'services')
  //     .leftJoinAndSelect('services.service', 'masterservices')
  //     .leftJoinAndSelect(
  //       'workshop.partners',
  //       'partners',
  //       'partners.active = true',
  //     )
  //     .leftJoinAndSelect(
  //       'workshop.banners',
  //       'banners',
  //       'banners.type = :type',
  //       { type: 'profile' },
  //     )
  //     .leftJoinAndSelect('partners.address', 'partner_address')
  //     .where(
  //       new Brackets(qb => {
  //         // qb.where(
  //         //   '(:nullService::text IS NULL OR LOWER(services.name) ~~ :queryServices OR LOWER(workshop.fantasy_name) ~~ :workshopName)',
  //         //   {
  //         //     queryServices: `%${services}%`,
  //         //     workshopName: `%${services}%`,
  //         //     nullService: services,
  //         //   },
  //         // );
  //         qb.where(
  //           '(:nullService::text IS NULL OR unaccent(LOWER(services.name)) ~~ unaccent(:queryServices) OR unaccent(LOWER(workshop.fantasy_name)) ~~ unaccent(:workshopName))',
  //           {
  //             queryServices: `%${services}%`,
  //             workshopName: `%${services}%`,
  //             nullService: services,
  //           },
  //         );

  //         qb.andWhere('workshop.active = true');

  //         return qb;
  //       }),
  //     )
  //     .addSelect(`(${subQuery})`, 'distance')
  //     .orderBy('distance', 'ASC')
  //     .take(1)
  //     .getMany();

  //   return workshops;
  // }

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
