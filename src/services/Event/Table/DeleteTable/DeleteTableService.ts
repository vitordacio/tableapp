import { inject, injectable } from 'tsyringe';

import { AppError } from '@utils/AppError';
import { IEventRepository } from '@repositories/EventRepository/IEventRepository';

@injectable()
class DeleteTableService {
  constructor(
    @inject('EventRepository')
    private eventRepository: IEventRepository,
  ) {}

  async execute(
    table_id: string,
    user: AuthorizedUser<UserPerm | PubPerm>,
  ): Promise<void> {
    const table = await this.eventRepository.findByIdAndType(table_id, 'table');

    if (!table) {
      throw new AppError('Mesa não encontrada.', 404);
    }

    if (user.id !== table.owner_id) {
      throw new AppError('Não autorizado.', 403);
    }

    // if (user.id !== table.owner_id) {
    //   const auth = table.participations.find(
    //     participation =>
    //       participation.user_id === user.id &&
    //       participation.type.type === 'manager',
    //   );

    //   if (!auth) {
    //     throw new AppError('Não autorizado.', 403);
    //   }
    // }

    // await this.eventRepository.delete(table.id_event);
    await this.eventRepository.remove(table);
  }
}

export { DeleteTableService };
