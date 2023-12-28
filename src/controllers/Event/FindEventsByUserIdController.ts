import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { userPerm, pubPerm } from '@config/constants';
import { FindEventsByUserIdService } from '@services/Event/FindEvent/FindEventsByUserIdService';

class FindEventsByUserIdController {
  private findEventByUserService: FindEventsByUserIdService;

  constructor() {
    this.findEventByUserService = container.resolve(FindEventsByUserIdService);
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { user_id } = req.params;
    const { page, limit } = req.query;

    if (
      !hasPermission(req.user, userPerm) &&
      !hasPermission(req.user, pubPerm)
    ) {
      throw new AppError('Operação não permitida.', 403);
    }

    const eventInstance = await this.findEventByUserService.execute({
      user_id,
      page: parseInt(page as string, 10),
      limit: parseInt(limit as string, 10),
      reqUser: req.user,
    });

    return res.status(200).json(instanceToPlain(eventInstance));
  }
}

export { FindEventsByUserIdController };
