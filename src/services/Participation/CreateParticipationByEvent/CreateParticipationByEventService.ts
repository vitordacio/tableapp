import { inject, injectable } from 'tsyringe';
import { v4 } from 'uuid';

import { Participation } from '@entities/Participation/Participation';
import { Notification } from '@entities/Notification/Notification';

import { IParticipationRepository } from '@repositories/ParticipationRepository/IParticipationRepository';

import { AppError } from '@utils/AppError';
import { hasModPermission } from '@utils/validations';
import { INotificationRepository } from '@repositories/NotificationRepository/INotificationRepository';
import { IEventRepository } from '@repositories/EventRepository/IEventRepository';
import { IUserRepository } from '@repositories/UserRepository/IUserRepository';
import { ICreateParticipationByEventDTO } from './CreateParticipationByEventServiceDTO';

@injectable()
class CreateParticipationByEventService {
  constructor(
    @inject('ParticipationRepository')
    private participationRepository: IParticipationRepository,

    @inject('EventRepository')
    private eventRepository: IEventRepository,

    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('NotificationRepository')
    private notificationRepository: INotificationRepository,
  ) {}

  async execute({
    event_id,
    user_id,
    confirmed_by_event,
    type,
    user,
  }: ICreateParticipationByEventDTO): Promise<Participation> {
    let participation: Participation | undefined;
    let notification: Notification | undefined;

    const foundUser = await this.userRepository.findById(user.id);

    if (!foundUser) {
      throw new AppError('Usuário não encontrado.', 404);
    }

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

    participation = event.participations.find(
      eventParticipation => eventParticipation.user_id === user_id,
    );

    if (!participation) {
      participation = this.participationRepository.create({
        id: v4(),
        type: type || 'user',
        user_id,
        event_id,
        confirmed_by_event: true,
        reviwed_by_event: true,
        reviwer_id: user.id,
      });

      notification = this.notificationRepository.create({
        id: v4(),
        message: `${foundUser.name} te convidou para participar de ${event.name}`,
        type: 'participation',
        sent_by: foundUser.id_user,
        user_id: event.owner_id,
        participation_id: participation.id_participation,
      });

      await this.notificationRepository.save(notification);

      await this.participationRepository.save(participation);

      return participation;
    }

    participation.confirmed_by_event = confirmed_by_event;
    if (!participation.reviwed_by_event) participation.reviwed_by_event = true;
    participation.reviwer_id = user.id;
    participation.in =
      participation.confirmed_by_user && participation.confirmed_by_event;

    if (participation.in) {
      notification = this.notificationRepository.create({
        id: v4(),
        message: `${foundUser.name} aprovou sua entrada em ${event.name}`,
        type: 'participation',
        sent_by: foundUser.id_user,
        user_id,
        participation_id: participation.id_participation,
      });
    }

    if (type && participation.type !== type) {
      participation.type = type;

      notification = this.notificationRepository.create({
        id: v4(),
        message: `Sua participação em ${event.name} foi atualizada`,
        type: 'participation',
        sent_by: foundUser.id_user,
        user_id: event.owner_id,
        participation_id: participation.id_participation,
      });
    }
    if (notification) await this.notificationRepository.save(notification);

    await this.participationRepository.save(participation);

    return participation;
  }
}

export { CreateParticipationByEventService };
