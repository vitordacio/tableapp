import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { userPerm } from '@config/constants';
import { AppError } from '@utils/AppError';
import { hasPermission } from '@utils/hasPermission';
import { UpdateEventService } from '@services/Event/UpdateEvent/UpdateEventService';

class UpdateEventController {
  private updateEventService: UpdateEventService;

  constructor() {
    this.updateEventService = container.resolve(UpdateEventService);
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const {
      event_id,
      name,
      location,
      date,
      time,
      finish_date,
      finish_time,
      club_name,
      performer,
      additional,
      drink_preferences,
      age_limit,
      free_ticket,
    } = req.body;

    if (!hasPermission(req.user, userPerm)) {
      throw new AppError('Operação não permitida.', 403);
    }

    const event = await this.updateEventService.execute({
      user: req.user,
      event_id,
      name,
      location,
      date,
      time,
      finish_date,
      finish_time,
      club_name,
      performer,
      additional,
      drink_preferences,
      age_limit,
      free_ticket,
    });

    return res.status(200).json(instanceToPlain(event));
  }
}

export { UpdateEventController };