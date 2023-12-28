import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { userPerm, pubPerm } from '@config/constants';
import { FindEventsByNameService } from '@services/Event/FindEvent/FindEventsByNameService';

class FindEventsByNameController {
  private findEventByNameService: FindEventsByNameService;

  constructor() {
    this.findEventByNameService = container.resolve(FindEventsByNameService);
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { name, page, limit } = req.query;

    if (
      !hasPermission(req.user, userPerm) &&
      !hasPermission(req.user, pubPerm)
    ) {
      throw new AppError('Operação não permitida.', 403);
    }

    const eventInstance = await this.findEventByNameService.execute({
      name: name as string,
      page: parseInt(page as string, 10),
      limit: parseInt(limit as string, 10),
      reqUser: req.user,
    });

    return res.status(201).json(instanceToPlain(eventInstance));
  }
}

export { FindEventsByNameController };
