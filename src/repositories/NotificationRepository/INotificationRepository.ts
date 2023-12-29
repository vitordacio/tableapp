import { INotification } from '@entities/Notification/INotification';
import { Notification } from '@entities/Notification/Notification';

interface INotificationRepository {
  create(data: INotification): Notification;
  save(notification: Notification): Promise<Notification>;
  findByUser(id: string, page: number, limit: number): Promise<Notification[]>;
  findById(id: string): Promise<Notification | undefined>;
  saveMany(notifications: Notification[]): Promise<Notification[]>;
  remove(entitie: Notification): Promise<void>;
  delete(id: string): Promise<void>;
}

export { INotificationRepository };
