import { inject, injectable } from 'tsyringe';
import { v4 } from 'uuid';
import { Participation } from '@entities/Participation/Participation';
import { IParticipationRepository } from '@repositories/ParticipationRepository/IParticipationRepository';
import { AppError } from '@utils/AppError';
import { INotificationRepository } from '@repositories/NotificationRepository/INotificationRepository';
import { IUserRepository } from '@repositories/UserRepository/IUserRepository';
import { IEventRepository } from '@repositories/EventRepository/IEventRepository';
import { handleEventControl } from '@utils/handleEvent';
import { ICreateParticipationByEventDTO } from './ICreateParticipationByEventServiceDTO';

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
    participation_id,
    confirm,
    reqUser,
  }: ICreateParticipationByEventDTO): Promise<Participation> {
    const [user, participation] = await Promise.all([
      this.userRepository.findById(reqUser.id),
      this.participationRepository.findById(participation_id),
    ]);

    if (!user) {
      throw new AppError(
        'Token expirado, por favor realize login novamente.',
        400,
      );
    }

    if (!participation) {
      throw new AppError('Solicitação não encontrada.', 404);
    }

    if (participation.reviwer_id) {
      throw new AppError('Essa participação já foi revisada.', 404);
    }

    if (user.id_user !== participation.event.author_id) {
      const hasAuth = await this.participationRepository.checkMod(
        user.id_user,
        participation.event_id,
      );

      if (!hasAuth) {
        throw new AppError('Não autorizado.', 403);
      }
    }

    participation.reviwer_id = user.id_user;
    participation.confirmed_by_event = confirm;
    participation.in =
      participation.confirmed_by_user && participation.confirmed_by_event;

    await this.participationRepository.save(participation);

    const { event } = participation;

    if (participation.in) {
      event.participating_count += 1;

      const notification = this.notificationRepository.create({
        id: v4(),
        message: `${user.name} confirmou sua participação no evento ${event.name}! 🎉`,
        type: 'participation',
        user_id: participation.user_id,
        participation_id: participation.id_participation,
      });

      await Promise.all([
        this.eventRepository.save(event),
        this.notificationRepository.save(notification),
      ]);
    }

    const eventControl = handleEventControl({
      event,
      user: participation.user,
      participation,
    });

    if (!participation.reviwer) participation.reviwer = user;
    participation.event_status = eventControl.event_status;
    participation.participation_id = eventControl.participation_id;
    participation.participation_status = eventControl.participation_status;
    participation.participating = eventControl.participating;
    participation.can_see_content = eventControl.can_see_content;

    return participation;
  }
}

export { CreateParticipationByEventService };
