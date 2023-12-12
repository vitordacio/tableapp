import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { pubPerm, userPerm } from '@config/constants';
import { FindParticipationsByUserIdService } from '@services/Participation/FindParticipation/FindParticipationsByUsertIdService';

class FindParticipationsByUserIdController {
  private findParticipationsByUserIdService: FindParticipationsByUserIdService;

  constructor() {
    this.findParticipationsByUserIdService = container.resolve(
      FindParticipationsByUserIdService,
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

    const participationInstance =
      await this.findParticipationsByUserIdService.execute({
        user_id,
        page: parseInt(page as string, 10),
        limit: parseInt(limit as string, 10),
      });

    return res.status(200).json(instanceToPlain(participationInstance));
  }
}

export { FindParticipationsByUserIdController };
