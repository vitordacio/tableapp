import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { pubPerm, userPerm } from '@config/constants';
import { FindReactsByUserIdService } from '@services/React/FindReact/FindReactsByUserIdService';

class FindReactsByUserIdController {
  private findReactsByUserIdService: FindReactsByUserIdService;

  constructor() {
    this.findReactsByUserIdService = container.resolve(
      FindReactsByUserIdService,
    );
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

    const reactInstance = await this.findReactsByUserIdService.execute({
      user_id,
      page: parseInt(page as string, 10),
      limit: parseInt(limit as string, 10),
    });

    return res.status(200).json(instanceToPlain(reactInstance));
  }
}

export { FindReactsByUserIdController };
