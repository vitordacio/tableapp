import { getRepository, Repository } from 'typeorm';
import { IMoment } from '@entities/Moment/IMoment';
import { Moment } from '@entities/Moment/Moment';
import { IMomentRepository } from '../IMomentRepository';

class MomentRepository implements IMomentRepository {
  private ormRepository: Repository<Moment>;

  constructor() {
    this.ormRepository = getRepository(Moment);
  }

  create(data: IMoment): Moment {
    const moment = this.ormRepository.create({
      id_moment: data.id,
      author_id: data.author_id,
      event_id: data.event_id,
      thumb_url: data.thumb_url,
      img_url: data.img_url,
      title: data.title,
      description: data.description,
    });

    return moment;
  }

  async save(moment: Moment): Promise<Moment> {
    const newMoment = await this.ormRepository.save(moment);

    return newMoment;
  }

  async findById(id: string): Promise<Moment | undefined> {
    const moment = await this.ormRepository.findOne({
      relations: ['event'],
      where: { id_moment: id },
    });

    return moment;
  }

  async findByEventId(
    event_id: string,
    page: number,
    limit: number,
  ): Promise<Moment[]> {
    const moment = await this.ormRepository.find({
      relations: ['author'],
      where: { event_id },
      order: { created_at: 'DESC' },
      take: limit,
      skip: page && limit ? limit * (page - 1) : undefined,
    });

    return moment;
  }

  async remove(entitie: Moment): Promise<void> {
    await this.ormRepository.softRemove(entitie);
  }
}

export { MomentRepository };
