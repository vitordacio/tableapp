import { inject, injectable } from 'tsyringe';

import { Notification } from '@entities/Notification/Notification';
import { INotificationRepository } from '@repositories/NotificationRepository/INotificationRepository';

@injectable()
class FindNotificationIndexService {
  constructor(
    @inject('NotificationRepository')
    private notificationRepository: INotificationRepository,
  ) {}

  async execute(
    user: AuthorizedUser<UserPerm | PubPerm>,
    page: number,
    limit: number,
  ): Promise<Notification[]> {
    const notifications = await this.notificationRepository.findByUser(
      user.id,
      page,
      limit,
    );

    return notifications;
  }
}

export { FindNotificationIndexService };
