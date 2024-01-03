import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { userPerm, pubPerm } from '@config/constants';
import { CreateMomentService } from '@services/Moment/CreateMoment/CreateMomentService';

class CreateMomentController {
  private createMomentService: CreateMomentService;

  constructor() {
    this.createMomentService = container.resolve(CreateMomentService);
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { event_id, title, description } = req.body;

    if (
      !hasPermission(req.user, userPerm) &&
      !hasPermission(req.user, pubPerm)
    ) {
      throw new AppError('Operação não permitida.', 403);
    }

    const momentInstance = await this.createMomentService.execute({
      event_id,
      title,
      description,
      reqUser: req.user,
    });

    return res.status(201).json(instanceToPlain(momentInstance));
  }
}

export { CreateMomentController };
