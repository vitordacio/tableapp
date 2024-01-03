// import { Brackets, getRepository, Repository } from 'typeorm';
import { Brackets, getRepository, Repository } from 'typeorm';
import { IEvent } from '@entities/Event/IEvent';
import { Event } from '@entities/Event/Event';
import { extractTagsFromText } from '@utils/generateTags';
import { IEventRepository } from '../IEventRepository';

const similarity = 0.3;

class EventRepository implements IEventRepository {
  private ormRepository: Repository<Event>;

  constructor() {
    this.ormRepository = getRepository(Event);
  }

  create(data: IEvent): Event {
    const event = this.ormRepository.create({
      id_event: data.id,
      author_id: data.author_id,
      type_id: data.type_id,
      name: data.name,
      location: data.location,
      start_time: data.start_time,
      finish_time: data.finish_time,
      participating_count: data.participating_count,
      reacts_count: data.reacts_count,
      address_id: data.address_id,
      additional: data.additional,
      club_name: data.club_name,
      drink_preferences: data.drink_preferences,
      min_amount: data.min_amount,
      tickets_free: data.tickets_free,
      ticket_value: data.ticket_value,
      private: data.private,
      tags: data.tags as unknown as string,
    });

    return event;
  }

  async save(event: Event): Promise<Event> {
    const newEvent = await this.ormRepository.save(event);

    return newEvent;
  }

  async findById(id: string): Promise<Event | undefined> {
    const event = await this.ormRepository.findOne({
      relations: ['type', 'address', 'author', 'performers'],
      where: { id_event: id },
    });

    return event;
  }

  async countByAuthor(author_id: string): Promise<number> {
    const count = await this.ormRepository.count({ author_id });
    return count;
  }

  async findIndexByType(type: string): Promise<Event[]> {
    const events = await this.ormRepository.find({
      relations: ['participations'],
      where: { type },
      order: { created_at: 'DESC' },
    });

    return events;
  }

  async findByCoordinates(
    lat: number,
    long: number,
    set_radius?: number,
  ): Promise<Event[]> {
    const radius = set_radius || 50;
    const events = await this.ormRepository
      .createQueryBuilder('event')
      .leftJoinAndSelect('event.address', 'address')
      .leftJoinAndSelect('event.author', 'author')
      .leftJoinAndSelect(
        'event.participations',
        'participations',
        'participations.in = true',
      )
      .where(
        `(6371 * acos( cos(radians(address.lat)) * cos(radians(${lat})) * cos(radians(address.long) - radians(${long})) + sin(radians(address.lat)) * sin(radians(${lat})))) <= ${radius}`,
      )
      .andWhere('event.actived = true')
      .getMany();

    return events;
  }

  async findByUserId(
    user_id: string,
    page: number,
    limit: number,
  ): Promise<Event[]> {
    const events = this.ormRepository
      .createQueryBuilder('event')
      .leftJoin('event.type', 'type')
      .where('event.author_id = :user_id', { user_id })
      .select([
        'event.id_event',
        'event.name',
        'event.location',
        'event.cover_photo',
        'event.start_time',
        'event.finish_time',
        'event.participating_count',
        'event.reacts_count',
        'type.name',
      ])
      .addSelect('event.created_at', 'created_at')
      .orderBy('created_at', 'DESC')
      .take(limit)
      .skip(page && limit ? limit * (page - 1) : undefined)
      .getMany();

    return events;
  }

  async findByName(
    name: string,
    page: number,
    limit: number,
  ): Promise<Event[]> {
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

    const events = this.ormRepository
      .createQueryBuilder('event')
      .leftJoin('event.author', 'author')
      .leftJoin('event.type', 'type')
      .where(
        new Brackets(qb => {
          qb.where(
            `${
              conditions
                ? `EXISTS (SELECT 1 FROM unnest(event.tags) tag WHERE ${conditions})`
                : '(:nullName::text IS NULL OR EXISTS (SELECT 1 FROM unnest(event.tags) tag WHERE unaccent(LOWER(tag)) ~~ unaccent(:query)))'
            }`,
            {
              query: `%${name}%`,
              nullName: name,
            },
          );

          return qb;
        }),
      )
      .select([
        'event.id_event',
        'event.name',
        'event.location',
        'event.cover_photo',
        'event.start_time',
        'event.finish_time',
        'event.participating_count',
        'event.reacts_count',
        'author.name',
        'author.username',
        'author.picture',
        'author.locale',
        'type.name',
      ])
      .addSelect(
        `(SELECT count(*) FROM unnest(event.tags) as tag WHERE ${conditions})`,
        'qtd',
      )
      .orderBy('qtd', 'DESC')
      .take(limit)
      .skip(page && limit ? limit * (page - 1) : undefined)
      .getMany();

    return events;
  }

  async findClosest(lat: number, long: number): Promise<Event[]> {
    const subQuery = `SELECT (6371 * acos( cos(radians(addresses.lat)) * cos(radians(${lat})) * cos(radians(addresses.long) - radians(${long})) + sin(radians(addresses.lat)) * sin(radians(${lat})))) AS distance FROM events LEFT JOIN addresses ON event.address_id = addresses.id_address WHERE events.id_event = event.id_event`;

    const events = await this.ormRepository
      .createQueryBuilder('event')
      .leftJoinAndSelect('event.address', 'address')
      .leftJoinAndSelect('event.author', 'author')
      .leftJoinAndSelect(
        'event.participations',
        'participations',
        'participations.in = true',
      )
      .addSelect(`(${subQuery})`, 'distance')
      .orderBy('distance', 'ASC')
      .take(10)
      .getMany();

    return events;
  }

  async findIndex(): Promise<Event[]> {
    const events = await this.ormRepository.find({
      relations: ['participations', 'address', 'author'],
      order: { created_at: 'DESC' },
    });

    return events;
  }

  async findToRemove(id: string): Promise<Event | undefined> {
    const event = await this.ormRepository.findOne({
      relations: [
        'type',
        'pictures',
        'achievements',
        'achievements.notifications',
        'participations',
        'participations.notifications',
        'emojis',
        'emojis.notifications',
        'reports',
      ],
      where: { id_event: id },
    });

    return event;
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  async remove(entitie: Event): Promise<void> {
    await this.ormRepository.softRemove(entitie);
  }
}

export { EventRepository };
