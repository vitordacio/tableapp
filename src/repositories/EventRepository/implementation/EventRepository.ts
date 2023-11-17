// import { Brackets, getRepository, Repository } from 'typeorm';
import { getRepository, Repository } from 'typeorm';
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
      date: data.date,
      time: data.time,
      finish_date: data.finish_date,
      finish_time: data.finish_time,
      cover_photo: data.cover_photo,
      address_id: data.address_id,
      additional: data.additional,
      actived: data.actived,
      club_name: data.club_name,
      performer: data.performer,
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
      relations: ['address', 'author', 'participations'],
      where: { id_event: id },
    });

    return event;
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

  async findSearch(
    query: string,
    page: number,
    limit: number,
  ): Promise<Event[]> {
    // CREATE EXTENSION IF NOT EXISTS unaccent;
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

    const events = this.ormRepository
      .createQueryBuilder('event')
      .where(
        `EXISTS (SELECT 1 FROM unnest(event.tags) tag WHERE ${conditions})`,
      )
      .select([
        'event.id_event',
        'event.name',
        `(SELECT count(*) FROM unnest(event.tags) as tag WHERE ${conditions}) as qtd`,
      ])
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

  // async searchClosests(
  //   lat: number,
  //   long: number,
  //   radius: number,
  // ): Promise<Event[]> {
  //   const events = await this.ormRepository
  //     .createQueryBuilder('event')
  //     .leftJoinAndSelect('event.address', 'address')
  //     .where(
  //       `calculate_distance(${lat}, ${long}, address.lat, address.long) <= ${radius}`,
  //     )
  //     .select(['event.id_event', 'event.type', 'address.lat', 'address.long'])
  //     .addSelect(
  //       `calculate_distance(${lat}, ${long}, address.lat, address.long)`,
  //       'distance',
  //     )
  //     .orderBy('distance', 'ASC')
  //     .take(10)
  //     .getMany();

  //   return events;
  // }

  async findIndex(): Promise<Event[]> {
    const events = await this.ormRepository.find({
      relations: ['participations', 'address', 'author'],
      order: { created_at: 'DESC' },
    });

    return events;
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  async remove(entitie: Event): Promise<void> {
    await this.ormRepository.softRemove(entitie);
  }
}

export { EventRepository };
