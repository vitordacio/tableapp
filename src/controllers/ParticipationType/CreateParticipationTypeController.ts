import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { masterPerm } from '@config/constants';
import { CreateParticipationTypeService } from '@services/ParticipationType/CreateParticipationType/CreateParticipationTypeService';

class CreateParticipationTypeController {
  private createParticipationService: CreateParticipationTypeService;

  constructor() {
    this.createParticipationService = container.resolve(
      CreateParticipationTypeService,
    );
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { type, type_name } = req.body;

    if (!hasPermission(req.user, masterPerm)) {
      throw new AppError('Operação não permitida.', 403);
    }

    const ParticipationTypeInstance =
      await this.createParticipationService.execute({
        type,
        type_name,
      });

    return res.status(201).json(instanceToPlain(ParticipationTypeInstance));
  }
}

export { CreateParticipationTypeController };
