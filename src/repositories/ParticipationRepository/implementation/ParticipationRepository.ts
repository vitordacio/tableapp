// import { Brackets, getRepository, Repository } from 'typeorm';
import { getRepository, Repository } from 'typeorm';
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
      confirmed: data.confirmed,
      reviwed: data.reviwed,
      event_id: data.event_id,
      user_id: data.user_id,
      type_id: data.type_id,
    });

    return participation;
  }

  async save(participation: Participation): Promise<Participation> {
    const newParticipation = await this.ormRepository.save(participation);

    return newParticipation;
  }

  async findById(id: string): Promise<Participation | undefined> {
    const participation = await this.ormRepository.findOne({
      relations: ['user', 'event', 'event.participations'],
      where: { id_participation: id },
    });

    return participation;
  }

  async findMod(
    user_id: string,
    event_id: string,
  ): Promise<Participation | undefined> {
    const participation = await this.ormRepository.findOne({
      relations: ['type'],
      where: { user_id, event_id, type: { type: 'mod' } },
    });

    return participation;
  }

  async findIndex(): Promise<Participation[]> {
    const participation = await this.ormRepository.find({
      relations: ['type', 'user'],
      order: { created_at: 'DESC' },
    });

    return participation;
  }

  async findByUserAndEvent(
    user_id: string,
    event_id: string,
  ): Promise<Participation | undefined> {
    const participation = await this.ormRepository.findOne({
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
