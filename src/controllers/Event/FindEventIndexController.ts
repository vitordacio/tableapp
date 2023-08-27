import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { pubPerm, userPerm } from '@config/constants';
import { FindEventIndexService } from '@services/Event/FindTable/FindEventIndexService';

class FindEventIndexController {
  private findEventIndexService: FindEventIndexService;

  constructor() {
    this.findEventIndexService = container.resolve(FindEventIndexService);
  }

  async handle(req: Request, res: Response): Promise<Response> {
    if (
      !hasPermission(req.user, userPerm) &&
      !hasPermission(req.user, pubPerm)
    ) {
      throw new AppError('Operação não permitida.', 403);
    }

    const eventInstance = await this.findEventIndexService.execute();

    return res.status(201).json(instanceToPlain(eventInstance));
  }
}

export { FindEventIndexController };
