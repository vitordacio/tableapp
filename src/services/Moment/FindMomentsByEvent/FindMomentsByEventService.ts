import { inject, injectable } from 'tsyringe';
import { Moment } from '@entities/Moment/Moment';
import { IMomentRepository } from '@repositories/MomentRepository/IMomentRepository';

@injectable()
class FindMomentsByEventService {
  constructor(
    @inject('MomentRepository')
    private momentRepository: IMomentRepository,
  ) {}

  async execute(event_id: string): Promise<Moment[]> {
    const moments = await this.momentRepository.findByEvent(event_id);

    return moments;
  }
}

export { FindMomentsByEventService };
