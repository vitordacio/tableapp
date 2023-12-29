import { getRepository, Repository } from 'typeorm';
import { IPerformer } from '@entities/Performer/IPerformer';
import { Performer } from '@entities/Performer/Performer';
import { IPerformerRepository } from '../IPerformerRepository';

class PerformerRepository implements IPerformerRepository {
  private ormRepository: Repository<Performer>;

  constructor() {
    this.ormRepository = getRepository(Performer);
  }

  create(data: IPerformer): Performer {
    const entitie = this.ormRepository.create({
      id_performer: data.id,
      name: data.name,
      user_id: data.user_id,
      event_id: data.event_id,
    });

    return entitie;
  }

  async save(entitie: Performer): Promise<Performer> {
    const newPerformer = await this.ormRepository.save(entitie);

    return newPerformer;
  }

  async saveMany(entities: Performer[]): Promise<Performer[]> {
    const performers = await this.ormRepository.save(entities);

    return performers;
  }

  async findById(id: string): Promise<Performer | undefined> {
    const performer = await this.ormRepository.findOne({
      relations: ['event'],
      where: { id_performer: id },
    });

    return performer;
  }

  async findByEventId(event_id: string): Promise<Performer[]> {
    const performer = await this.ormRepository.find({
      where: { event_id },
    });

    return performer;
  }

  async remove(entitie: Performer): Promise<void> {
    await this.ormRepository.softRemove(entitie);
  }
}

export { PerformerRepository };
