import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { masterPerm } from '@config/constants';
import { FetchEventTypesService } from '@services/Types/EventType/FetchEventTypes/FetchEventTypesService';

class FetchEventTypesController {
  private fetchEventTypesService: FetchEventTypesService;

  constructor() {
    this.fetchEventTypesService = container.resolve(FetchEventTypesService);
  }

  async handle(req: Request, res: Response): Promise<Response> {
    if (!hasPermission(req.user, masterPerm)) {
      throw new AppError('Operação não permitida.', 403);
    }

    const eventTypeInstance = await this.fetchEventTypesService.execute();

    return res.status(201).json(instanceToPlain(eventTypeInstance));
  }
}

export { FetchEventTypesController };
