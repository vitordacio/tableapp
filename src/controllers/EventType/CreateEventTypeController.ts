import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { masterPerm } from '@config/constants';
import { CreateEventTypeService } from '@services/EventType/CreateEventType/CreateEventTypeService';

class CreateEventTypeController {
  private createEventService: CreateEventTypeService;

  constructor() {
    this.createEventService = container.resolve(CreateEventTypeService);
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { type, type_name } = req.body;

    if (!hasPermission(req.user, masterPerm)) {
      throw new AppError('Operação não permitida.', 403);
    }

    const eventTypeInstance = await this.createEventService.execute({
      type,
      type_name,
    });

    return res.status(201).json(instanceToPlain(eventTypeInstance));
  }
}

export { CreateEventTypeController };
