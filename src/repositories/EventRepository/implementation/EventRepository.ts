// import { Brackets, getRepository, Repository } from 'typeorm';
import { getRepository, Repository } from 'typeorm';
import { IEvent } from '@entities/Event/IEvent';
import { Event } from '@entities/Event/Event';
import { IEventRepository } from '../IEventRepository';

class EventRepository implements IEventRepository {
  private ormRepository: Repository<Event>;

  constructor() {
    this.ormRepository = getRepository(Event);
  }

  create(data: IEvent): Event {
    const event = this.ormRepository.create({
      id_event: data.id,
      owner: data.owner,
      type: data.type,
      name: data.name,
      location: data.location,
      date: data.date,
      time: data.time,
      finish_date: data.finish_date,
      finish_time: data.finish_time,
      img_url: data.finish_time,
      address: data.address,
      additional: data.additional,
      club_name: data.club_name,
      performer: data.performer,
      drink_preferences: data.drink_preferences,
      age_limit: data.age_limit || 0,
      free_ticket: data.free_ticket || 0,
      private: data.private,
    });

    return event;
  }

  async save(event: Event): Promise<Event> {
    const newEvent = await this.ormRepository.save(event);

    return newEvent;
  }

  async findById(id: string): Promise<Event | undefined> {
    const event = await this.ormRepository.findOne({
      relations: ['address', 'owner', 'participations'],
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
      .leftJoinAndSelect('event.owner', 'owner')
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

  async findClosest(lat: number, long: number): Promise<Event[]> {
    const subQuery = `SELECT (6371 * acos( cos(radians(addresses.lat)) * cos(radians(${lat})) * cos(radians(addresses.long) - radians(${long})) + sin(radians(addresses.lat)) * sin(radians(${lat})))) AS distance FROM events LEFT JOIN addresses ON event.address_id = addresses.id_address WHERE events.id_event = event.id_event`;

    const events = await this.ormRepository
      .createQueryBuilder('event')
      .leftJoinAndSelect('event.address', 'address')
      .leftJoinAndSelect('event.owner', 'owner')
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

  async findIndex(): Promise<Event[]> {
    const events = await this.ormRepository.find({
      relations: ['participations', 'address', 'owner'],
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
