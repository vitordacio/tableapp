import { inject, injectable } from 'tsyringe';
import { Moment } from '@entities/Moment/Moment';
import { IMomentRepository } from '@repositories/MomentRepository/IMomentRepository';
import { IFindByEventIdDTO } from './IFindMomentsByEventDTO';

@injectable()
class FindMomentsByEventService {
  constructor(
    @inject('MomentRepository')
    private momentRepository: IMomentRepository,
  ) {}

  async execute({
    event_id,
    page,
    limit,
  }: IFindByEventIdDTO): Promise<Moment[]> {
    const moments = await this.momentRepository.findByEventId(
      event_id,
      page || 1,
      limit || 20,
    );

    return moments;
  }
}

export { FindMomentsByEventService };
