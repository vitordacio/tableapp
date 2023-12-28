import { inject, injectable } from 'tsyringe';
import { v4 } from 'uuid';
import { Participation } from '@entities/Participation/Participation';
import { IParticipationRepository } from '@repositories/ParticipationRepository/IParticipationRepository';
import { AppError } from '@utils/AppError';
import { INotificationRepository } from '@repositories/NotificationRepository/INotificationRepository';
import { IUserRepository } from '@repositories/UserRepository/IUserRepository';
import { IEventRepository } from '@repositories/EventRepository/IEventRepository';
import { generateEventControl } from '@utils/handleControl';
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
    user,
  }: ICreateParticipationByEventDTO): Promise<Participation> {
    const [participation, foundUser] = await Promise.all([
      this.participationRepository.findById(participation_id),
      this.userRepository.findById(user.id),
    ]);

    if (!participation) {
      throw new AppError('Solicitação não encontrada.', 404);
    }

    if (!foundUser) {
      throw new AppError('Usuário não encontrado.', 404);
    }

    if (participation.reviwer_id) {
      throw new AppError('Essa participação já foi revisada.', 404);
    }

    if (user.id !== participation.event.author_id) {
      const hasAuth = await this.participationRepository.checkMod(
        user.id,
        participation.event_id,
      );

      if (!hasAuth) {
        throw new AppError('Não autorizado.', 403);
      }
    }

    participation.reviwer_id = foundUser.id_user;
    participation.confirmed_by_event = confirm;
    participation.in =
      participation.confirmed_by_user && participation.confirmed_by_event;

    participation.event.participating_count += 1;

    await Promise.all([
      this.participationRepository.save(participation),
      this.eventRepository.save(participation.event),
    ]);

    if (participation.in) {
      const notification = this.notificationRepository.create({
        id: v4(),
        message: `${foundUser.name} confirmou sua participação no evento ${participation.event.name}! 🎉`,
        type: 'participation',
        author_id: foundUser.id_user,
        user_id: participation.user_id,
        participation_id: participation.id_participation,
      });

      await this.notificationRepository.save(notification);
    }

    participation.control = generateEventControl({
      event: participation.event,
      participation,
      user: foundUser,
    });

    return participation;
  }
}

export { CreateParticipationByEventService };
