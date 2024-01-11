import { inject, injectable } from 'tsyringe';
import { v4 } from 'uuid';
import { Participation } from '@entities/Participation/Participation';
import { Notification } from '@entities/Notification/Notification';
import { IParticipationRepository } from '@repositories/ParticipationRepository/IParticipationRepository';
import { AppError } from '@utils/AppError';
import { INotificationRepository } from '@repositories/NotificationRepository/INotificationRepository';
import { IEventRepository } from '@repositories/EventRepository/IEventRepository';
import { IUserRepository } from '@repositories/UserRepository/IUserRepository';
import { IParticipationTypeRepository } from '@repositories/ParticipationTypeRepository/IParticipationTypeRepository';
import { handleEventControl } from '@utils/handleEvent';
import { ICreateInviteRequestDTO } from './ICreateInviteRequestServiceDTO';

@injectable()
class CreateInviteRequestService {
  constructor(
    @inject('ParticipationRepository')
    private participationRepository: IParticipationRepository,

    @inject('ParticipationTypeRepository')
    private participationTypeRepository: IParticipationTypeRepository,

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
    type_id,
    reqUser,
  }: ICreateInviteRequestDTO): Promise<Participation> {
    let participation: Participation | undefined;
    let notification: Notification | undefined;

    if (reqUser.id === user_id) {
      throw new AppError('Não é possível convidar a si mesmo.', 400);
    }

    const [foundUser, user, event, participationType] = await Promise.all([
      this.userRepository.findById(reqUser.id),
      this.userRepository.findById(user_id),
      this.eventRepository.findById(event_id),
      this.participationTypeRepository.findById(type_id),
    ]);

    if (!foundUser) {
      throw new AppError(
        'Token expirado, por favor realize o login novamente.',
        400,
      );
    }

    if (!user) {
      throw new AppError('Usuário não encontrado.', 404);
    }

    if (!event) {
      throw new AppError('Evento não encontrado.', 404);
    }

    if (!participationType) {
      throw new AppError('Tipo de participação não encontrado.', 404);
    }

    if (foundUser.id_user !== event.author_id) {
      const hasAuth = await this.participationRepository.checkMod(
        foundUser.id_user,
        event.id_event,
      );

      if (!hasAuth) {
        throw new AppError('Não autorizado.', 403);
      }
    }

    participation = await this.participationRepository.findByUserAndEvent(
      user_id,
      event.id_event,
    );

    if (!participation) {
      participation = this.participationRepository.create({
        id: v4(),
        type_id,
        user_id,
        event_id,
        confirmed_by_event: true,
        reviwer_id: foundUser.id_user,
      });

      notification = this.notificationRepository.create({
        id: v4(),
        message: `Você foi convidado para participar do evento ${event.name}! 🎉`,
        type: 'participation',
        author_id: foundUser.id_user,
        user_id,
        participation_id: participation.id_participation,
      });
    } else {
      if (type_id !== participation.type_id)
        participation.type = participationType;
      participation.confirmed_by_event = true;
      participation.reviwer_id = foundUser.id_user;

      notification = this.notificationRepository.create({
        id: v4(),
        message: '',
        type: 'participation',
        author_id: foundUser.id_user,
        user_id,
        participation_id: participation.id_participation,
      });

      notification.message = `Sua participação no evento ${event.name} foi ${
        participation.in ? 'alterada' : 'confirmada'
      }! 🎉`;

      participation.in =
        participation.confirmed_by_user && participation.confirmed_by_event;
    }

    await this.participationRepository.save(participation);

    await this.notificationRepository.save(notification);

    if (!participation.type) participation.type = participationType;

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

export { CreateInviteRequestService };
