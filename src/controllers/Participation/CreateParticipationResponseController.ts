import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { pubPerm, userPerm } from '@config/constants';
import { CreateParticipationResponseService } from '@services/Participation/CreateParticipationResponse/CreateParticipationResponseService';

class CreateParticipationResponseController {
  private createParticipationResponseService: CreateParticipationResponseService;

  constructor() {
    this.createParticipationResponseService = container.resolve(
      CreateParticipationResponseService,
    );
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { participation_id } = req.body;

    if (
      !hasPermission(req.user, userPerm) &&
      !hasPermission(req.user, pubPerm)
    ) {
      throw new AppError('Operação não permitida.', 403);
    }

    const participationInstance =
      await this.createParticipationResponseService.execute({
        participation_id,
        user: req.user,
      });

    return res.status(201).json(instanceToPlain(participationInstance));
  }
}

export { CreateParticipationResponseController };
