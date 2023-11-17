import { inject, injectable } from 'tsyringe';
import { v4 } from 'uuid';

import { Participation } from '@entities/Participation/Participation';
import { Notification } from '@entities/Notification/Notification';

import { IParticipationRepository } from '@repositories/ParticipationRepository/IParticipationRepository';

import { AppError } from '@utils/AppError';
import { hasModPermission } from '@utils/validations';
import { INotificationRepository } from '@repositories/NotificationRepository/INotificationRepository';
import { IUserRepository } from '@repositories/UserRepository/IUserRepository';
import { ICreateParticipationByEventDTO } from './CreateParticipationByEventServiceDTO';

@injectable()
class CreateParticipationByEventService {
  constructor(
    @inject('ParticipationRepository')
    private participationRepository: IParticipationRepository,

    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('NotificationRepository')
    private notificationRepository: INotificationRepository,
  ) {}

  async execute({
    participation_id,
    confirmed_by_event,
    user,
  }: ICreateParticipationByEventDTO): Promise<Participation> {
    let notification: Notification | undefined;

    const participation = await this.participationRepository.findById(
      participation_id,
    );

    if (!participation) {
      throw new AppError('Solicitação não encontrada.', 404);
    }

    const foundUser = await this.userRepository.findById(user.id);

    if (!foundUser) {
      throw new AppError('Usuário não encontrado.', 404);
    }

    if (user.id !== participation.event.author_id) {
      const auth = hasModPermission(
        user.id,
        participation.event.participations,
      );

      if (!auth) {
        throw new AppError('Não autorizado.', 403);
      }
    }

    participation.confirmed_by_event = confirmed_by_event;
    participation.in =
      participation.confirmed_by_user && participation.confirmed_by_event;

    if (participation.in && !participation.reviwed_by_event) {
      notification = this.notificationRepository.create({
        id: v4(),
        message: `${foundUser.name} aprovou sua entrada em ${participation.event.name}`,
        type: 'participation',
        author_id: foundUser.id_user,
        user_id: participation.user_id,
        participation_id: participation.id_participation,
      });
    }

    if (!participation.reviwed_by_event) participation.reviwed_by_event = true;
    participation.reviwer_id = user.id;

    await this.participationRepository.save(participation);

    if (notification) await this.notificationRepository.save(notification);

    return participation;
  }
}

export { CreateParticipationByEventService };
