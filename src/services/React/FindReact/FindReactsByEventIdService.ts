import { inject, injectable } from 'tsyringe';
import { React } from '@entities/React/React';
import { IReactRepository } from '@repositories/ReactRepository/IReactRepository';
import { IEventRepository } from '@repositories/EventRepository/IEventRepository';
import { AppError } from '@utils/AppError';
import { IFindByEventIdDTO } from './IFindReactsDTO';

@injectable()
class FindReactsByEventIdService {
  constructor(
    @inject('ReactRepository')
    private reactRepository: IReactRepository,

    @inject('EventRepository')
    private eventRepository: IEventRepository,
  ) {}

  async execute({
    event_id,
    limit,
    page,
  }: IFindByEventIdDTO): Promise<React[]> {
    const [event, reacts] = await Promise.all([
      this.eventRepository.findById(event_id),
      this.reactRepository.findReceivedsByEventId(
        event_id,
        page || 1,
        limit || 20,
      ),
    ]);

    if (!event) {
      throw new AppError('Evento não encontrado.', 404);
    }

    return reacts;
  }
}

export { FindReactsByEventIdService };
