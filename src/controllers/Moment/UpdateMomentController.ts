import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { userPerm, pubPerm } from '@config/constants';
import { UpdateMomentService } from '@services/Moment/UpdateMoment/UpdateMomentService';

class UpdateMomentController {
  private updateMomentService: UpdateMomentService;

  constructor() {
    this.updateMomentService = container.resolve(UpdateMomentService);
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { moment_id, title, description } = req.body;

    if (
      !hasPermission(req.user, userPerm) &&
      !hasPermission(req.user, pubPerm)
    ) {
      throw new AppError('Operação não permitida.', 403);
    }

    const momentInstance = await this.updateMomentService.execute({
      moment_id,
      title,
      description,
      reqUser: req.user,
    });

    return res.status(201).json(instanceToPlain(momentInstance));
  }
}

export { UpdateMomentController };
