import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { masterPerm } from '@config/constants';
import { FetchParticipationTypesService } from '@services/Types/ParticipationType/FetchParticipationTypes/FetchParticipationTypesService';

class FetchParticipationTypesController {
  private fetchParticipationTypesService: FetchParticipationTypesService;

  constructor() {
    this.fetchParticipationTypesService = container.resolve(
      FetchParticipationTypesService,
    );
  }

  async handle(req: Request, res: Response): Promise<Response> {
    if (!hasPermission(req.user, masterPerm)) {
      throw new AppError('Operação não permitida.', 403);
    }

    const participationTypeInstance =
      await this.fetchParticipationTypesService.execute();

    return res.status(201).json(instanceToPlain(participationTypeInstance));
  }
}

export { FetchParticipationTypesController };
