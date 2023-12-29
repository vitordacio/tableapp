import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { userPerm, pubPerm } from '@config/constants';
import { CreateReportEventService } from '@services/Report/CreateReportEvent/CreateReportEventService';

class CreateReportEventController {
  private createReportEventService: CreateReportEventService;

  constructor() {
    this.createReportEventService = container.resolve(CreateReportEventService);
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { message, event_id } = req.body;

    if (
      !hasPermission(req.user, userPerm) &&
      !hasPermission(req.user, pubPerm)
    ) {
      throw new AppError('Operação não permitida.', 403);
    }

    const reportInstance = await this.createReportEventService.execute({
      message,
      event_id,
      reqUser: req.user,
    });

    return res.status(201).json(instanceToPlain(reportInstance));
  }
}

export { CreateReportEventController };
