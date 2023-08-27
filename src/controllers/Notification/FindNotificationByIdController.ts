import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { pubPerm, userPerm } from '@config/constants';
import { FindNotificationByIdService } from '@services/Notification/FindNotification/FindNotificationByIdService';

class FindNotificationByIdController {
  private findNotificationByIdService: FindNotificationByIdService;

  constructor() {
    this.findNotificationByIdService = container.resolve(
      FindNotificationByIdService,
    );
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    if (
      !hasPermission(req.user, userPerm) &&
      !hasPermission(req.user, pubPerm)
    ) {
      throw new AppError('Operação não permitida.', 403);
    }

    const notificationInstance = await this.findNotificationByIdService.execute(
      id,
      req.user,
    );

    return res.status(201).json(instanceToPlain(notificationInstance));
  }
}

export { FindNotificationByIdController };
