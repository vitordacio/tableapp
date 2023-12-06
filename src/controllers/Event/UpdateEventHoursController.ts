import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { userPerm, pubPerm } from '@config/constants';
import { AppError } from '@utils/AppError';
import { hasPermission } from '@utils/hasPermission';
import { UpdateEventHoursService } from '@services/Event/UpdateEvent/UpdateEventHoursService';

class UpdateEventHoursController {
  private updateEventHoursService: UpdateEventHoursService;

  constructor() {
    this.updateEventHoursService = container.resolve(UpdateEventHoursService);
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { event_id, start_time, finish_time } = req.body;

    if (
      !hasPermission(req.user, userPerm) &&
      !hasPermission(req.user, pubPerm)
    ) {
      throw new AppError('Operação não permitida.', 403);
    }

    const event = await this.updateEventHoursService.execute({
      user: req.user,
      event_id,
      start_time,
      finish_time,
    });

    return res.status(200).json(instanceToPlain(event));
  }
}

export { UpdateEventHoursController };
