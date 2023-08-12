import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { pubPerm, userPerm } from '@config/constants';
import { CreateParticipationRequestService } from '@services/Participation/CreateParticipationRequest/CreateParticipationRequestService';

class CreateParticipationRequestController {
  private createParticipationRequestService: CreateParticipationRequestService;

  constructor() {
    this.createParticipationRequestService = container.resolve(
      CreateParticipationRequestService,
    );
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { event_id } = req.body;

    if (
      !hasPermission(req.user, userPerm) &&
      !hasPermission(req.user, pubPerm)
    ) {
      throw new AppError('Operação não permitida.', 403);
    }

    const participationInstance =
      await this.createParticipationRequestService.execute({
        event_id,
        user: req.user,
      });

    return res.status(201).json(instanceToPlain(participationInstance));
  }
}

export { CreateParticipationRequestController };
