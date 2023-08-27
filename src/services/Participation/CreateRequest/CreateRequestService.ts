import { inject, injectable } from 'tsyringe';
import { v4 } from 'uuid';

import { Participation } from '@entities/Participation/Participation';
import { IEventRepository } from '@repositories/EventRepository/IEventRepository';
import { IUserRepository } from '@repositories/UserRepository/IUserRepository';
import { IParticipationRepository } from '@repositories/ParticipationRepository/IParticipationRepository';

import { AppError } from '@utils/AppError';
import { INotificationRepository } from '@repositories/NotificationRepository/INotificationRepository';
import { ICreateRequestDTO } from './CreateRequestServiceDTO';

@injectable()
class CreateRequestService {
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

  async execute({ event_id, user }: ICreateRequestDTO): Promise<Participation> {
    let participation: Participation | undefined;
    const foundUser = await this.userRepository.findById(user.id);

    if (!foundUser) {
      throw new AppError('Usuário não encontrado.', 404);
    }

    const event = await this.eventRepository.findById(event_id);

    if (!event) {
      throw new AppError('Evento não encontrado.', 404);
    }

    participation = await this.participationRepository.findByUserAndEvent(
      user.id,
      event.id_event,
    );

    if (participation) {
      throw new AppError('Solicitação já enviada.', 404);
    }

    participation = this.participationRepository.create({
      id: v4(),
      type: 'user',
      user_id: foundUser.id_user,
      event_id: event.id_event,
    });

    await this.participationRepository.save(participation);

    const notifcation = this.notificationRepository.create({
      id: v4(),
      message: `${foundUser.name} pediu para participar de ${event.name}`,
      type: 'participation',
      sent_by: foundUser.id_user,
      user_id: event.owner_id,
      participation_id: participation.id_participation,
    });

    await this.notificationRepository.save(notifcation);

    return participation;
  }
}

export { CreateRequestService };
