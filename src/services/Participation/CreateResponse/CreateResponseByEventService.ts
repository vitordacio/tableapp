import { inject, injectable } from 'tsyringe';
import { v4 } from 'uuid';

import { Participation } from '@entities/Participation/Participation';

import { IParticipationRepository } from '@repositories/ParticipationRepository/IParticipationRepository';

import { AppError } from '@utils/AppError';
import { hasModPermission } from '@utils/validations';
import { INotificationRepository } from '@repositories/NotificationRepository/INotificationRepository';
import { ICreateResponseDTO } from './CreateResponseServiceDTO';

@injectable()
class CreateResponseByEventService {
  constructor(
    @inject('ParticipationRepository')
    private participationRepository: IParticipationRepository,

    @inject('NotificationRepository')
    private notificationRepository: INotificationRepository,
  ) {}

  async execute({
    participation_id,
    confirmed_by_event,
    user,
  }: ICreateResponseDTO): Promise<Participation> {
    const participation = await this.participationRepository.findById(
      participation_id,
    );

    if (!participation) {
      throw new AppError('Solicitação não encontrada.', 404);
    }

    if (user.id !== participation.event.owner_id) {
      const auth = hasModPermission(
        user.id,
        participation.event.participations,
      );

      if (!auth) {
        throw new AppError('Não autorizado.', 403);
      }
    }

    participation.in = confirmed_by_event;
    participation.confirmed_by_event = confirmed_by_event;
    participation.reviwed_by_event = true;
    participation.reviwer_id = user.id;
    await this.participationRepository.save(participation);

    // mandar notificaçao para usuário
    if (confirmed_by_event) {
      const notifcation = this.notificationRepository.create({
        id: v4(),
        message: `Sua participação em ${participation.event.name} foi aprovada!`,
        type: 'participation',
        sent_by: user.id,
        user_id: participation.user_id,
        participation_id: participation.id_participation,
      });

      await this.notificationRepository.save(notifcation);
    }

    return participation;
  }
}

export { CreateResponseByEventService };
