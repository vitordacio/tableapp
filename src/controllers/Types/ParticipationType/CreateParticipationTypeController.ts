import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { masterPerm } from '@config/constants';
import { CreateParticipationTypeService } from '@services/Types/ParticipationType/CreateParticipationType/CreateParticipationTypeService';

class CreateParticipationTypeController {
  private createParticipationTypeService: CreateParticipationTypeService;

  constructor() {
    this.createParticipationTypeService = container.resolve(
      CreateParticipationTypeService,
    );
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { name } = req.body;

    if (!hasPermission(req.user, masterPerm)) {
      throw new AppError('Operação não permitida.', 403);
    }

    const participationTypeInstance =
      await this.createParticipationTypeService.execute({
        name,
      });

    return res.status(201).json(instanceToPlain(participationTypeInstance));
  }
}

export { CreateParticipationTypeController };
