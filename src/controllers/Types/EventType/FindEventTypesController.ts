import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { masterPerm } from '@config/constants';
import { FindEventTypesService } from '@services/Types/EventType/FindEventTypes/FindEventTypesService';

class FindEventTypesController {
  private findEventTypesService: FindEventTypesService;

  constructor() {
    this.findEventTypesService = container.resolve(FindEventTypesService);
  }

  async handle(req: Request, res: Response): Promise<Response> {
    if (!hasPermission(req.user, masterPerm)) {
      throw new AppError('Operação não permitida.', 403);
    }

    const eventTypeInstance = await this.findEventTypesService.execute();

    return res.status(200).json(instanceToPlain(eventTypeInstance));
  }
}

export { FindEventTypesController };
