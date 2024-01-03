import { inject, injectable } from 'tsyringe';
import { v4 } from 'uuid';
import { Participation } from '@entities/Participation/Participation';
import { IEventRepository } from '@repositories/EventRepository/IEventRepository';
import { IUserRepository } from '@repositories/UserRepository/IUserRepository';
import { IParticipationRepository } from '@repositories/ParticipationRepository/IParticipationRepository';
import { AppError } from '@utils/AppError';
import { INotificationRepository } from '@repositories/NotificationRepository/INotificationRepository';
import { IParticipationTypeRepository } from '@repositories/ParticipationTypeRepository/IParticipationTypeRepository';
import { handleEventControl } from '@utils/handleEvent';
import { ICreateParticipationByUserDTO } from './ICreateParticipationByUserServiceDTO';

@injectable()
class CreateParticipationByUserService {
  constructor(
    @inject('EventRepository')
    private eventRepository: IEventRepository,

    @inject('ParticipationRepository')
    private participationRepository: IParticipationRepository,

    @inject('ParticipationTypeRepository')
    private participationTypeRepository: IParticipationTypeRepository,

    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('NotificationRepository')
    private notificationRepository: INotificationRepository,
  ) {}

  async execute({
    event_id,
    reqUser,
  }: ICreateParticipationByUserDTO): Promise<Participation> {
    const [user, event, alreadyExists] = await Promise.all([
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

    if (user.id_user === event.author_id) {
      throw new AppError('Usuário é autor do evento.', 400);
    }

    if (alreadyExists) {
      throw new AppError('Participação já cadastrada.', 400);
    }

    let participationType = await this.participationTypeRepository.findByName(
      'user',
    );

    if (!participationType) {
      participationType = this.participationTypeRepository.create({
        id: v4(),
        name: 'user',
      });

      await this.participationTypeRepository.save(participationType);
    }

    const participation = this.participationRepository.create({
      id: v4(),
      type_id: participationType.id_participation_type,
      user_id: user.id_user,
      event_id: event.id_event,
      confirmed_by_user: true,
    });

    const notification = this.notificationRepository.create({
      id: v4(),
      message: `${user.name} quer participar de ${event.name}! 🎉`,
      type: 'participation',
      user_id: event.author_id,
      participation_id: participation.id_participation,
    });

    await Promise.all([
      await this.participationRepository.save(participation),
      await this.notificationRepository.save(notification),
    ]);

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

export { CreateParticipationByUserService };
