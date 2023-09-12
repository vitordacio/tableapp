import { inject, injectable } from 'tsyringe';
import { v4 } from 'uuid';

import { Notification } from '@entities/Notification/Notification';
import { Participation } from '@entities/Participation/Participation';
import { IEventRepository } from '@repositories/EventRepository/IEventRepository';
import { IUserRepository } from '@repositories/UserRepository/IUserRepository';
import { IParticipationRepository } from '@repositories/ParticipationRepository/IParticipationRepository';

import { AppError } from '@utils/AppError';
import { INotificationRepository } from '@repositories/NotificationRepository/INotificationRepository';
import { ICreateParticipationByUserDTO } from './CreateParticipationByUserServiceDTO';

@injectable()
class CreateParticipationByUserService {
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
    confirmed_by_user,
    user,
  }: ICreateParticipationByUserDTO): Promise<Participation> {
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

    if (user.id === event.owner_id) {
      throw new AppError('Você é o dono do evento.', 404);
    }

    participation = await this.participationRepository.findByUserAndEvent(
      user.id,
      event.id_event,
    );

    if (!participation) {
      participation = this.participationRepository.create({
        id: v4(),
        type: 'user',
        user_id: foundUser.id_user,
        event_id: event.id_event,
      });

      notification = this.notificationRepository.create({
        id: v4(),
        message: `${foundUser.name} pediu para participar de ${event.name}`,
        type: 'participation',
        sent_by: foundUser.id_user,
        user_id: event.owner_id,
        participation_id: participation.id_participation,
      });
    }

    participation.confirmed_by_user = confirmed_by_user;

    participation.in =
      participation.confirmed_by_user && participation.confirmed_by_event;

    if (!participation.reviwed_by_user) participation.reviwed_by_user = true;

    await this.participationRepository.save(participation);

    if (participation.in) {
      notification = this.notificationRepository.create({
        id: v4(),
        message: `${foundUser.name} está participando de ${event.name}`,
        type: 'participation',
        sent_by: foundUser.id_user,
        user_id: event.owner_id,
        participation_id: participation.id_participation,
      });
    }

    if (notification) await this.notificationRepository.save(notification);

    return participation;
  }
}

export { CreateParticipationByUserService };
