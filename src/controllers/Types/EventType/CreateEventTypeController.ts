import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { masterPerm } from '@config/constants';
import { CreateEventTypeService } from '@services/Types/EventType/CreateEventType/CreateEventTypeService';

class CreateEventTypeController {
  private createEventTypeService: CreateEventTypeService;

  constructor() {
    this.createEventTypeService = container.resolve(CreateEventTypeService);
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { name, verified } = req.body;

    if (!hasPermission(req.user, masterPerm)) {
      throw new AppError('Operação não permitida.', 403);
    }

    const eventTypeInstance = await this.createEventTypeService.execute({
      name,
      verified,
    });

    return res.status(201).json(instanceToPlain(eventTypeInstance));
  }
}

export { CreateEventTypeController };
