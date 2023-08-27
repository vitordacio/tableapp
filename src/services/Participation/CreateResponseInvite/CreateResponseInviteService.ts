import { inject, injectable } from 'tsyringe';
import { v4 } from 'uuid';

import { Participation } from '@entities/Participation/Participation';

import { IParticipationRepository } from '@repositories/ParticipationRepository/IParticipationRepository';

import { AppError } from '@utils/AppError';
import { INotificationRepository } from '@repositories/NotificationRepository/INotificationRepository';
import { ICreateResponseInviteDTO } from './CreateResponseInviteServiceDTO';

@injectable()
class CreateResponseInviteService {
  constructor(
    @inject('ParticipationRepository')
    private participationRepository: IParticipationRepository,

    @inject('NotificationRepository')
    private notificationRepository: INotificationRepository,
  ) {}

  async execute({
    participation_id,
    confirmed_by_user,
    user,
  }: ICreateResponseInviteDTO): Promise<Participation> {
    const participation = await this.participationRepository.findById(
      participation_id,
    );

    if (!participation || user.id !== participation.user_id) {
      throw new AppError('Solicitação não encontrada.', 404);
    }

    participation.confirmed_by_user = confirmed_by_user;
    participation.in = confirmed_by_user;
    participation.reviwed_by_user = true;
    await this.participationRepository.save(participation);

    if (confirmed_by_user) {
      const notifcation = this.notificationRepository.create({
        id: v4(),
        message: `${participation.user.name} confirmou presença em ${participation.event.name}`,
        type: 'participation',
        sent_by: user.id,
        user_id: participation.event.owner_id,
        participation_id: participation.id_participation,
      });

      await this.notificationRepository.save(notifcation);
    }

    return participation;
  }
}

export { CreateResponseInviteService };
