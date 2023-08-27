import { inject, injectable } from 'tsyringe';

import { Notification } from '@entities/Notification/Notification';
import { INotificationRepository } from '@repositories/NotificationRepository/INotificationRepository';

import { AppError } from '@utils/AppError';

@injectable()
class FindNotificationByIdService {
  constructor(
    @inject('NotificationRepository')
    private NotificationRepository: INotificationRepository,
  ) {}

  async execute(
    notification_id: string,
    user: AuthorizedUser<UserPerm | PubPerm>,
  ): Promise<Notification> {
    const notification = await this.NotificationRepository.findById(
      notification_id,
    );

    if (!notification || notification.user_id !== user.id) {
      throw new AppError('Notificação não encontrada.', 404);
    }

    return notification;
  }
}

export { FindNotificationByIdService };
