import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { pubPerm, userPerm } from '@config/constants';
import { FindEventTypeIndexService } from '@services/EventType/FindEventType/FindEventTypeIndexService';

class FindEventTypeIndexController {
  private findEventTypeIndexService: FindEventTypeIndexService;

  constructor() {
    this.findEventTypeIndexService = container.resolve(
      FindEventTypeIndexService,
    );
  }

  async handle(req: Request, res: Response): Promise<Response> {
    if (
      !hasPermission(req.user, userPerm) &&
      !hasPermission(req.user, pubPerm)
    ) {
      throw new AppError('Operação não permitida.', 403);
    }

    const eventInstance = await this.findEventTypeIndexService.execute();

    return res.status(201).json(instanceToPlain(eventInstance));
  }
}

export { FindEventTypeIndexController };
