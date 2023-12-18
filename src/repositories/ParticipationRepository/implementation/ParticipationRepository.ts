// import { Brackets, getRepository, Repository } from 'typeorm';
import { getRepository, IsNull, Not, Repository } from 'typeorm';
import { IParticipation } from '@entities/Participation/IParticipation';
import { Participation } from '@entities/Participation/Participation';
import { IParticipationRepository } from '../IParticipationRepository';

class ParticipationRepository implements IParticipationRepository {
  private ormRepository: Repository<Participation>;

  constructor() {
    this.ormRepository = getRepository(Participation);
  }

  create(data: IParticipation): Participation {
    const participation = this.ormRepository.create({
      id_participation: data.id,
      type_id: data.type_id,
      in: data.in,
      confirmed_by_user: data.confirmed_by_user,
      confirmed_by_event: data.confirmed_by_event,
      reviwer_id: data.reviwer_id,
      user_id: data.user_id,
      event_id: data.event_id,
    });

    return participation;
  }

  async save(participation: Participation): Promise<Participation> {
    const newParticipation = await this.ormRepository.save(participation);

    return newParticipation;
  }

  async findById(id: string): Promise<Participation | undefined> {
    const participation = await this.ormRepository.findOne({
      relations: ['event', 'user'],
      where: { id_participation: id },
    });

    return participation;
  }

  async checkMod(
    user_id: string,
    event_id: string,
  ): Promise<Participation | undefined> {
    const participation = await this.ormRepository
      .createQueryBuilder('participation')
      .leftJoin('participation.type', 'type')
      .where(
        'participation.user_id = :user_id AND participation.event_id = :event_id',
        {
          user_id,
          event_id,
        },
      )
      .andWhere('type.name = :type', { type: 'mod' })
      .getOne();

    return participation;
  }

  async findIndex(): Promise<Participation[]> {
    const participations = await this.ormRepository.find({
      // relations: ['user'],
      order: { created_at: 'DESC' },
    });

    return participations;
  }

  async findByEventId(
    event_id: string,
    page: number,
    limit: number,
  ): Promise<Participation[]> {
    const participations = await this.ormRepository.find({
      // relations: ['user'],
      where: { event_id, in: true },
      order: { created_at: 'DESC' },
      take: limit,
      skip: page && limit ? limit * (page - 1) : undefined,
    });

    return participations;
  }

  async findByUserId(
    user_id: string,
    page: number,
    limit: number,
  ): Promise<Participation[]> {
    const participations = await this.ormRepository.find({
      // relations: ['event'],
      where: { user_id, in: true },
      order: { created_at: 'DESC' },
      take: limit,
      skip: page && limit ? limit * (page - 1) : undefined,
    });

    return participations;
  }

  async findRequestsPending(
    event_id: string,
    page: number,
    limit: number,
  ): Promise<Participation[]> {
    const participations = await this.ormRepository.find({
      relations: ['type', 'user', 'reviwer'],
      where: { event_id, reviwer_id: IsNull() },
      order: { created_at: 'DESC' },
      take: limit,
      skip: page && limit ? limit * (page - 1) : undefined,
    });

    return participations;
  }

  async findRequestsReviwed(
    event_id: string,
    page: number,
    limit: number,
  ): Promise<Participation[]> {
    const participations = await this.ormRepository.find({
      relations: ['type', 'user', 'reviwer'],
      where: { event_id, reviwer_id: Not(IsNull()) },
      order: { created_at: 'DESC' },
      take: limit,
      skip: page && limit ? limit * (page - 1) : undefined,
    });

    return participations;
  }

  async findByUserAndEvent(
    user_id: string,
    event_id: string,
  ): Promise<Participation | undefined> {
    const participation = await this.ormRepository.findOne({
      relations: ['type', 'event'],
      where: { user_id, event_id },
    });

    return participation;
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  async remove(entitie: Participation): Promise<void> {
    await this.ormRepository.softRemove(entitie);
  }
}

export { ParticipationRepository };
