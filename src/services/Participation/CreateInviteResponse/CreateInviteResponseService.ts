import { inject, injectable } from 'tsyringe';
import { v4 } from 'uuid';

import { Participation } from '@entities/Participation/Participation';
import { IParticipationRepository } from '@repositories/ParticipationRepository/IParticipationRepository';

import { AppError } from '@utils/AppError';
import { INotificationRepository } from '@repositories/NotificationRepository/INotificationRepository';
import { IEventRepository } from '@repositories/EventRepository/IEventRepository';
import { IUserRepository } from '@repositories/UserRepository/IUserRepository';
import { ICreateInviteResponseDTO } from './CreateInviteResponseServiceDTO';

@injectable()
class CreateInviteResponseService {
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
    user,
  }: ICreateInviteResponseDTO): Promise<Participation> {
    const [foundUser, event] = await Promise.all([
      this.userRepository.findById(user.id),
      this.eventRepository.findById(event_id),
    ]);

    if (!foundUser) {
      throw new AppError('Usuário não encontrado.', 404);
    }

    if (!event) {
      throw new AppError('Evento não encontrado.', 404);
    }

    const participation = await this.participationRepository.findByUserAndEvent(
      user.id,
      event.id_event,
    );

    if (!participation) {
      throw new AppError('Convite não encontrado.', 404);
    }

    participation.confirmed_by_user = true;
    participation.in =
      participation.confirmed_by_event && participation.confirmed_by_user;

    participation.event.participating_count += 1;

    const notification = this.notificationRepository.create({
      id: v4(),
      message: `${event.name} está participando do evento ${event.name}! 🎉`,
      type: 'participation',
      author_id: foundUser.id_user,
      user_id: event.author_id,
      participation_id: participation.id_participation,
    });

    await Promise.all([
      this.participationRepository.save(participation),
      this.eventRepository.save(participation.event),
      this.notificationRepository.save(notification),
    ]);

    return participation;
  }
}

export { CreateInviteResponseService };
