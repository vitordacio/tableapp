import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { masterPerm } from '@config/constants';
import { DeleteParticipationTypeService } from '@services/Types/ParticipationType/DeleteParticipationType/DeleteParticipationTypeService';

class DeleteParticipationTypeController {
  private deleteParticipationTypeService: DeleteParticipationTypeService;

  constructor() {
    this.deleteParticipationTypeService = container.resolve(
      DeleteParticipationTypeService,
    );
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    if (!hasPermission(req.user, masterPerm)) {
      throw new AppError('Operação não permitida.', 403);
    }

    const participationTypeInstance =
      await this.deleteParticipationTypeService.execute(id);

    return res.status(201).json(instanceToPlain(participationTypeInstance));
  }
}

export { DeleteParticipationTypeController };
