import { inject, injectable } from 'tsyringe';

import { AppError } from '@utils/AppError';
import { INotificationRepository } from '@repositories/NotificationRepository/INotificationRepository';

@injectable()
class DeleteNotificationService {
  constructor(
    @inject('NotificationRepository')
    private notificationRepository: INotificationRepository,
  ) {}

  async execute(
    notification_id: string,
    user: AuthorizedUser<UserPerm | PubPerm>,
  ): Promise<void> {
    const notification = await this.notificationRepository.findById(
      notification_id,
    );

    if (!notification || notification.user_id !== user.id) {
      throw new AppError('Notificação não encontrada.', 404);
    }

    await this.notificationRepository.remove(notification);
  }
}

export { DeleteNotificationService };
