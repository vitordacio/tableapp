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
  //         qb.where(
  //           '(:nullService::text IS NULL OR LOWER(services.name) ~~ :queryServices OR LOWER(workshop.fantasy_name) ~~ :workshopName)',
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
