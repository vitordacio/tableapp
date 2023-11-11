import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { pubPerm, userPerm } from '@config/constants';
import { CreateResponseService } from '@services/Friendship/CreateResponse/CreateResponseService';

class CreateResponseController {
  private createResponseService: CreateResponseService;

  constructor() {
    this.createResponseService = container.resolve(CreateResponseService);
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { friend_id } = req.params;

    if (
      !hasPermission(req.user, userPerm) &&
      !hasPermission(req.user, pubPerm)
    ) {
      throw new AppError('Operação não permitida.', 403);
    }

    const participationInstance = await this.createResponseService.execute({
      friend_id,
      user: req.user,
    });

    return res.status(201).json(instanceToPlain(participationInstance));
  }
}

export { CreateResponseController };
