import { inject, injectable } from 'tsyringe';
import { v4 } from 'uuid';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { IEventRepository } from '@repositories/EventRepository/IEventRepository';
import { IAchievementRepository } from '@repositories/AchievementRepository/IAchievementRepository';
import { IAchievementTypeRepository } from '@repositories/AchievementTypeRepository/IAchievementTypeRepository';
import { INotificationRepository } from '@repositories/NotificationRepository/INotificationRepository';
import { Achievement } from '@entities/Achievement/Achievement';
import { IAchievementHandlerServiceDTO } from './ICreateEventServiceDTO';

dayjs.extend(utc);

@injectable()
class AchievementHandlerService {
  constructor(
    @inject('EventRepository')
    private eventRepository: IEventRepository,

    @inject('AchievementRepository')
    private achievementRepository: IAchievementRepository,

    @inject('AchievementTypeRepository')
    private achievementTypeRepository: IAchievementTypeRepository,

    @inject('NotificationRepository')
    private notificationRepository: INotificationRepository,
  ) {}

  async execute({ user, event }: IAchievementHandlerServiceDTO): Promise<void> {
    const [countByAuthor, userAchievements, achievementTypes] =
      await Promise.all([
        this.eventRepository.countByAuthor(user.id_user),
        this.achievementRepository.findByUserIdCategoryName(
          user.id_user,
          'event',
          'host',
        ),
        this.achievementTypeRepository.findManyDirectional(
          'user',
          'event',
          'host',
        ),
      ]);

    const achievements: Achievement[] = [];
    let achievement: Achievement | undefined;
    const currentCount = countByAuthor + 1;

    if (currentCount >= 1000) {
      const achievementAlreadyExists = userAchievements.some(
        a => a.type.min_value === 1000,
      );

      if (!achievementAlreadyExists) {
        const currentAchievementType = achievementTypes.find(
          a => a.min_value === 1000,
        );

        if (currentAchievementType) {
          achievement = this.achievementRepository.create({
            id: v4(),
            type_id: currentAchievementType.id_achievement_type,
            user_id: user.id_user,
          });
          achievements.push(achievement);
        }
      }
    } else if (currentCount >= 100) {
      const achievementAlreadyExists = userAchievements.some(
        a => a.type.min_value === 100,
      );

      if (!achievementAlreadyExists) {
        const currentAchievementType = achievementTypes.find(
          a => a.min_value === 100,
        );

        if (currentAchievementType) {
          achievement = this.achievementRepository.create({
            id: v4(),
            type_id: currentAchievementType.id_achievement_type,
            user_id: user.id_user,
          });
          achievements.push(achievement);
        }
      }
    } else if (currentCount >= 10) {
      const achievementAlreadyExists = userAchievements.some(
        a => a.type.min_value === 10,
      );

      if (!achievementAlreadyExists) {
        const currentAchievementType = achievementTypes.find(
          a => a.min_value === 10,
        );

        if (currentAchievementType) {
          achievement = this.achievementRepository.create({
            id: v4(),
            type_id: currentAchievementType.id_achievement_type,
            user_id: user.id_user,
          });
          achievements.push(achievement);
        }
      }
    } else {
      const achievementAlreadyExists = userAchievements.some(
        a => a.type.min_value === 1,
      );

      if (!achievementAlreadyExists) {
        const currentAchievementType = achievementTypes.find(
          a => a.min_value === 1,
        );

        if (currentAchievementType) {
          achievement = this.achievementRepository.create({
            id: v4(),
            type_id: currentAchievementType.id_achievement_type,
            user_id: user.id_user,
          });
          achievements.push(achievement);
        }

        const firstEventAchievementType =
          await this.achievementTypeRepository.findDirectional(
            'event',
            'event',
            'host_first',
            3,
          );

        if (firstEventAchievementType) {
          const eventAchievement = this.achievementRepository.create({
            id: v4(),
            type_id: firstEventAchievementType.id_achievement_type,
            event_id: event.id_event,
          });
          achievements.push(eventAchievement);
        }
      }
    }

    if (achievements.length !== 0)
      await this.achievementRepository.saveMany(achievements);

    if (achievement) {
      const userNotification = this.notificationRepository.create({
        id: v4(),
        type: 'achievement',
        message: 'Você desbloqueou uma nova conquista! 🏆',
        user_id: user.id_user,
        achievement_id: achievement.id_achievement,
      });
      await this.notificationRepository.save(userNotification);
    }
  }
}

export { AchievementHandlerService };
