import { inject, injectable } from 'tsyringe';
import { v4 } from 'uuid';

import { Participation } from '@entities/Participation/Participation';
import { IEventRepository } from '@repositories/EventRepository/IEventRepository';
import { IUserRepository } from '@repositories/UserRepository/IUserRepository';
import { IParticipationRepository } from '@repositories/ParticipationRepository/IParticipationRepository';

import { AppError } from '@utils/AppError';
import { INotificationRepository } from '@repositories/NotificationRepository/INotificationRepository';
import { hasModPermission } from '@utils/validations';
import { ICreateInviteDTO } from './CreateInviteServiceDTO';

@injectable()
class CreateInviteService {
  constructor(
    @inject('EventRepository')
    private eventRepository: IEventRepository,

    @inject('ParticipationRepository')
    private participationRepository: IParticipationRepository,

    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('NotificationRepository')
    private notificationRepository: INotificationRepository,
  ) {}

  async execute({
    event_id,
    user_id,
    type,
    user,
  }: ICreateInviteDTO): Promise<Participation> {
    let participation: Participation | undefined;

    const event = await this.eventRepository.findById(event_id);

    if (!event) {
      throw new AppError('Evento não encontrado.', 404);
    }

    if (user.id !== event.owner_id) {
      const auth = hasModPermission(user.id, event.participations);

      if (!auth) {
        throw new AppError('Não autorizado.', 403);
      }
    }

    // if (type === 'mod' && event.owner_id !== user.id) {
    //   throw new AppError('Não autorizado.', 403);
    // }

    // if (type !== 'mod') {
    //   const auth = hasModPermission(user.id, event.participations);

    //   if (!auth) {
    //     throw new AppError('Não autorizado.', 403);
    //   }
    // }

    const client = await this.userRepository.findById(user_id);

    if (!client) {
      throw new AppError('Usuário não encontrado.', 404);
    }

    participation = await this.participationRepository.findByUserAndEvent(
      user_id,
      event.id_event,
    );

    if (
      user_id === user.id ||
      user_id === event.owner_id ||
      user_id === participation?.user_id
    ) {
      throw new AppError('Destinatário inválido.', 400);
    }

    if (!participation) {
      participation = this.participationRepository.create({
        id: v4(),
        type,
        event_id,
        user_id,
        confirmed_by_user: false,
        reviwed_by_user: false,
      });
    } else {
      participation.type = type;
    }

    participation.in = participation.confirmed_by_user;
    participation.confirmed_by_event = true;
    participation.reviwed_by_event = true;
    participation.reviwer_id = user.id;

    await this.participationRepository.save(participation);

    const notifcation = this.notificationRepository.create({
      id: v4(),
      message: `Você foi convidado para ser moderador em ${event.name}`,
      type: 'participation',
      sent_by: user.id,
      user_id,
      participation_id: participation.id_participation,
    });

    await this.notificationRepository.save(notifcation);

    return participation;
  }
}

export { CreateInviteService };
