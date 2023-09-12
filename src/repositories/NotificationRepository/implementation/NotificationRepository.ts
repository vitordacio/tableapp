import { getRepository, Repository } from 'typeorm';
import { INotification } from '@entities/Notification/INotification';
import { Notification } from '@entities/Notification/Notification';
import { INotificationRepository } from '../INotificationRepository';

class NotificationRepository implements INotificationRepository {
  private ormRepository: Repository<Notification>;

  constructor() {
    this.ormRepository = getRepository(Notification);
  }

  create({
    id,
    message,
    type,
    user_id,
    sent_by,
    friendship_id,
    participation_id,
  }: INotification): Notification {
    const notification = this.ormRepository.create({
      id_notification: id,
      message,
      type,
      user_id,
      sent_by,
      friendship_id,
      participation_id,
    });

    return notification;
  }

  async save(notification: Notification): Promise<Notification> {
    const newNotification = await this.ormRepository.save(notification);

    return newNotification;
  }

  async findByUser(
    id: string,
    page: number = 1,
    limit: number = 50,
  ): Promise<Notification[]> {
    const notifications = await this.ormRepository.find({
      order: { created_at: 'DESC' },
      relations: ['participation', 'participation.event'],
      // relations: [
      //   'workshop',
      //   'repair',
      //   'repair.vehicle',
      //   'preventive',
      //   'preventive.type',
      //   'preventive.vehicle',
      // ],
      // where: { user_id: id, type: In(['master', 'preventive_user', 'status']) },
      where: { user_id: id },
      take: limit,
      skip: limit * (page - 1),
    });

    return notifications;
  }

  // async findByWorkshop(
  //   id: string,
  //   page: number,
  //   limit: number,
  // ): Promise<Notification[]> {
  //   const notifications = await this.ormRepository.find({
  //     order: { created_at: 'DESC' },
  //     relations: [
  //       'user',
  //       'preventive',
  //       'preventive.type',
  //       'preventive.vehicle',
  //     ],
  //     where: {
  //       workshop_id: id,
  //       type: In(['master', 'preventive_workshop']),
  //     },
  //     take: limit,
  //     skip: limit * (page - 1),
  //   });

  //   return notifications;
  // }

  async saveMany(notifications: Notification[]): Promise<Notification[]> {
    const newNotifications = await this.ormRepository.save(notifications);

    return newNotifications;
  }

  async findById(id: string): Promise<Notification | undefined> {
    const notification = await this.ormRepository.findOne({
      where: { id_notification: id },
    });

    return notification;
  }

  async remove(entitie: Notification): Promise<void> {
    await this.ormRepository.softRemove(entitie);
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export { NotificationRepository };