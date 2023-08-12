import { inject, injectable } from 'tsyringe';

import { AppError } from '@utils/AppError';
import { IEventTypeRepository } from '@repositories/EventTypeRepository/IEventTypeRepository';

@injectable()
class DeleteEventTypeService {
  constructor(
    @inject('EventTypeRepository')
    private eventTypeRepository: IEventTypeRepository,
  ) {}

  async execute(event_id: string): Promise<void> {
    const eventType = await this.eventTypeRepository.findById(event_id);

    if (!eventType) {
      throw new AppError('Tipo não encontrado.', 404);
    }

    // await this.eventTypeRepository.delete(eventType.id_event_type);
    await this.eventTypeRepository.remove(eventType);
  }
}

export { DeleteEventTypeService };
