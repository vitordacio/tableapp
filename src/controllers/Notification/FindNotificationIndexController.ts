import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { pubPerm, userPerm } from '@config/constants';
import { FindNotificationIndexService } from '@services/Notification/FindNotification/FindNotificationIndexService';

class FindNotificationIndexController {
  private findNotificationIndexService: FindNotificationIndexService;

  constructor() {
    this.findNotificationIndexService = container.resolve(
      FindNotificationIndexService,
    );
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { page, limit } = req.query;

    if (
      !hasPermission(req.user, userPerm) &&
      !hasPermission(req.user, pubPerm)
    ) {
      throw new AppError('Operação não permitida.', 403);
    }

    const notificationInstance =
      await this.findNotificationIndexService.execute(
        req.user,
        page as unknown as number,
        limit as unknown as number,
      );

    return res.status(201).json(instanceToPlain(notificationInstance));
  }
}

export { FindNotificationIndexController };
