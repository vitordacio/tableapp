import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { userPerm, pubPerm } from '@config/constants';
import { FindParticipationTypesService } from '@services/Types/ParticipationType/FindParticipationTypes/FindParticipationTypesService';

class FindParticipationTypesController {
  private findParticipationTypesService: FindParticipationTypesService;

  constructor() {
    this.findParticipationTypesService = container.resolve(
      FindParticipationTypesService,
    );
  }

  async handle(req: Request, res: Response): Promise<Response> {
    if (
      !hasPermission(req.user, userPerm) &&
      !hasPermission(req.user, pubPerm)
    ) {
      throw new AppError('Operação não permitida.', 403);
    }

    const participationTypeInstance =
      await this.findParticipationTypesService.execute();

    return res.status(200).json(instanceToPlain(participationTypeInstance));
  }
}

export { FindParticipationTypesController };
