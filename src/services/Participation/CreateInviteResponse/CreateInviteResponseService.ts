import { inject, injectable } from 'tsyringe';
import { v4 } from 'uuid';
import { Participation } from '@entities/Participation/Participation';
import { IParticipationRepository } from '@repositories/ParticipationRepository/IParticipationRepository';
import { AppError } from '@utils/AppError';
import { INotificationRepository } from '@repositories/NotificationRepository/INotificationRepository';
import { IEventRepository } from '@repositories/EventRepository/IEventRepository';
import { IUserRepository } from '@repositories/UserRepository/IUserRepository';
import { handleEventControl } from '@utils/handleEvent';
import { ICreateInviteResponseDTO } from './ICreateInviteResponseServiceDTO';

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
    reqUser,
  }: ICreateInviteResponseDTO): Promise<Participation> {
    const [user, event, participation] = await Promise.all([
      this.userRepository.findById(reqUser.id),
      this.eventRepository.findById(event_id),
      this.participationRepository.findByUserAndEvent(reqUser.id, event_id),
    ]);

    if (!user) {
      throw new AppError(
        'Token expirado, por favor realize login novamente.',
        400,
      );
    }

    if (!event) {
      throw new AppError('Evento não encontrado.', 404);
    }

    if (!participation) {
      throw new AppError('Convite não encontrado.', 404);
    }

    participation.confirmed_by_user = true;
    participation.in =
      participation.confirmed_by_event && participation.confirmed_by_user;

    participation.event.participating_count += 1;

    const notification = this.notificationRepository.create({
      id: v4(),
      message: `${user.name} está participando do evento ${event.name}! 🎉`,
      type: 'participation',
      user_id: event.author_id,
      participation_id: participation.id_participation,
    });

    await Promise.all([
      this.participationRepository.save(participation),
      this.eventRepository.save(participation.event),
      this.notificationRepository.save(notification),
    ]);

    const eventControl = handleEventControl({
      event,
      user,
      participation,
    });

    participation.event_status = eventControl.event_status;
    participation.participation_id = eventControl.participation_id;
    participation.participation_status = eventControl.participation_status;
    participation.participating = eventControl.participating;
    participation.can_see_content = eventControl.can_see_content;

    return participation;
  }
}

export { CreateInviteResponseService };
