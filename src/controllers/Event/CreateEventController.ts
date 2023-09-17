import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { pubPerm, userPerm } from '@config/constants';
import { CreateEventService } from '@services/Event/CreateEvent/CreateEventService';

class CreateEventController {
  private createEventService: CreateEventService;

  constructor() {
    this.createEventService = container.resolve(CreateEventService);
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const {
      type,
      name,
      location,
      date,
      time,
      finish_date,
      finish_time,
      additional,
      drink_preferences,
      age_limit,
      free_ticket,
      is_private,
      club_name,
      performer,
    } = req.body;

    if (
      !hasPermission(req.user, userPerm) &&
      !hasPermission(req.user, pubPerm)
    ) {
      throw new AppError('Operação não permitida.', 403);
    }

    const eventInstance = await this.createEventService.execute({
      user: req.user,
      type,
      name,
      location,
      date,
      time,
      finish_date,
      finish_time,
      additional,
      drink_preferences,
      age_limit,
      free_ticket,
      is_private,
      club_name,
      performer,
    });

    return res.status(201).json(instanceToPlain(eventInstance));
  }
}

export { CreateEventController };
