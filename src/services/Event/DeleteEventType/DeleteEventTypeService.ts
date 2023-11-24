import { inject, injectable } from 'tsyringe';
import { AppError } from '@utils/AppError';
import { IEventTypeRepository } from '@repositories/EventTypeRepository/IEventTypeRepository';

@injectable()
class DeleteEventTypeService {
  constructor(
    @inject('EventTypeRepository')
    private eventTypeRepository: IEventTypeRepository,
  ) {}

  async execute(type_id: string): Promise<void> {
    const eventType = await this.eventTypeRepository.findById(type_id);

    if (!eventType) {
      throw new AppError('Tipo de evento não encontrado.', 404);
    }

    await this.eventTypeRepository.remove(eventType);
  }
}

export { DeleteEventTypeService };
