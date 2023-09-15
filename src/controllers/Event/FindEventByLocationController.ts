import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { pubPerm, userPerm } from '@config/constants';
import { FindEventByLocationService } from '@services/Event/FindEvent/FindEventByLocationService';

class FindEventByLocationController {
  private findEventByLocationService: FindEventByLocationService;

  constructor() {
    this.findEventByLocationService = container.resolve(
      FindEventByLocationService,
    );
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { lat, long } = req.body;

    if (
      !hasPermission(req.user, userPerm) &&
      !hasPermission(req.user, pubPerm)
    ) {
      throw new AppError('Operação não permitida.', 403);
    }

    const eventInstance = await this.findEventByLocationService.execute(
      lat,
      long,
    );

    return res.status(201).json(instanceToPlain(eventInstance));
  }
}

export { FindEventByLocationController };
