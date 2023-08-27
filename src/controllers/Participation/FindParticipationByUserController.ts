import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { pubPerm, userPerm } from '@config/constants';
import { FindParticipationByUserService } from '@services/Participation/FindParticipation/FindParticipationByUserService';

class FindParticipationByUserController {
  private findParticipationByUserService: FindParticipationByUserService;

  constructor() {
    this.findParticipationByUserService = container.resolve(
      FindParticipationByUserService,
    );
  }

  async handle(req: Request, res: Response): Promise<Response> {
    if (
      !hasPermission(req.user, userPerm) &&
      !hasPermission(req.user, pubPerm)
    ) {
      throw new AppError('Operação não permitida.', 403);
    }

    const ParticipationInstance =
      await this.findParticipationByUserService.execute(req.user);

    return res.status(201).json(instanceToPlain(ParticipationInstance));
  }
}

export { FindParticipationByUserController };
