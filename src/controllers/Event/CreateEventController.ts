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
      type_id,
      name,
      location,
      start_time,
      finish_time,
      is_private,
      additional,
      drink_preferences,
      min_amount,
      ticket_value,
      tickets_free,
      club_name,
      address_id,
    } = req.body;

    if (
      !hasPermission(req.user, userPerm) &&
      !hasPermission(req.user, pubPerm)
    ) {
      throw new AppError('Operação não permitida.', 403);
    }

    const eventInstance = await this.createEventService.execute({
      user: req.user,
      type_id,
      name: name.trim(),
      location: location.trim(),
      start_time,
      finish_time,
      is_private,
      additional,
      drink_preferences,
      min_amount,
      ticket_value,
      tickets_free,
      club_name,
      address_id,
    });

    return res.status(201).json(instanceToPlain(eventInstance));
  }
}

export { CreateEventController };
