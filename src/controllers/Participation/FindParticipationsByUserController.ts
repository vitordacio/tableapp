import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { pubPerm, userPerm } from '@config/constants';
import { FindParticipationsByUserService } from '@services/Participation/FindParticipation/FindParticipationsByUserService';

class FindParticipationsByUserController {
  private findParticipationsByUserService: FindParticipationsByUserService;

  constructor() {
    this.findParticipationsByUserService = container.resolve(
      FindParticipationsByUserService,
    );
  }

  async handle(req: Request, res: Response): Promise<Response> {
    if (
      !hasPermission(req.user, userPerm) &&
      !hasPermission(req.user, pubPerm)
    ) {
      throw new AppError('Operação não permitida.', 403);
    }

    const participationInstance =
      await this.findParticipationsByUserService.execute(req.user);

    return res.status(201).json(instanceToPlain(participationInstance));
  }
}

export { FindParticipationsByUserController };
