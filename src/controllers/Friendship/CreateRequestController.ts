import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { pubPerm, userPerm } from '@config/constants';
import { CreateRequestService } from '@services/Friendship/CreateRequest/CreateRequestService';

class CreateRequestController {
  private createRequestService: CreateRequestService;

  constructor() {
    this.createRequestService = container.resolve(CreateRequestService);
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { user_id } = req.params;

    if (
      !hasPermission(req.user, userPerm) &&
      !hasPermission(req.user, pubPerm)
    ) {
      throw new AppError('Operação não permitida.', 403);
    }

    const participationInstance = await this.createRequestService.execute({
      user_id,
      reqUser: req.user,
    });

    return res.status(201).json(instanceToPlain(participationInstance));
  }
}

export { CreateRequestController };
