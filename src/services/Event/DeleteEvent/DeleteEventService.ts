import { inject, injectable } from 'tsyringe';

import { AppError } from '@utils/AppError';
import { IEventRepository } from '@repositories/EventRepository/IEventRepository';
// import { hasModPermission } from '@utils/validations';

@injectable()
class DeleteEventService {
  constructor(
    @inject('EventRepository')
    private eventRepository: IEventRepository,
  ) {}

  async execute(
    event_id: string,
    user: AuthorizedUser<UserPerm | PubPerm>,
  ): Promise<void> {
    const event = await this.eventRepository.findById(event_id);

    if (!event || user.id !== event.author_id) {
      throw new AppError('Evento não encontrado.', 404);
    }

    // if (user.id !== event.author_id) {
    //   const auth = hasModPermission(user.id, event.participations);

    //   if (!auth) {
    //     throw new AppError('Não autorizado.', 403);
    //   }
    // }

    // await this.eventRepository.delete(table.id_event);
    await this.eventRepository.remove(event);
  }
}

export { DeleteEventService };
