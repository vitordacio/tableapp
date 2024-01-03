import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { pubPerm, userPerm } from '@config/constants';
import { FindReactsReceivedByUserIdService } from '@services/React/FindReact/FindReactsReceivedByUserIdService';

class FindReactsReceivedByUserIdController {
  private findReactsReceivedByUserIdService: FindReactsReceivedByUserIdService;

  constructor() {
    this.findReactsReceivedByUserIdService = container.resolve(
      FindReactsReceivedByUserIdService,
    );
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { user_id } = req.params;
    const { name, page, limit } = req.query;

    if (
      !hasPermission(req.user, userPerm) &&
      !hasPermission(req.user, pubPerm)
    ) {
      throw new AppError('Operação não permitida.', 403);
    }

    const reactInstance = await this.findReactsReceivedByUserIdService.execute({
      user_id,
      name: name as string,
      page: parseInt(page as string, 10),
      limit: parseInt(limit as string, 10),
      reqUser: req.user,
    });

    return res.status(200).json(instanceToPlain(reactInstance));
  }
}

export { FindReactsReceivedByUserIdController };