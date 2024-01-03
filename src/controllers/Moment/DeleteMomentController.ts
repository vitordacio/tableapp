import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { userPerm, pubPerm } from '@config/constants';
import { DeleteMomentService } from '@services/Moment/DeleteMoment/DeleteMomentService';

class DeleteMomentController {
  private deleteMomentService: DeleteMomentService;

  constructor() {
    this.deleteMomentService = container.resolve(DeleteMomentService);
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { moment_id } = req.params;

    if (
      !hasPermission(req.user, userPerm) &&
      !hasPermission(req.user, pubPerm)
    ) {
      throw new AppError('Operação não permitida.', 403);
    }

    const momentInstance = await this.deleteMomentService.execute({
      moment_id,
      reqUser: req.user,
    });

    return res.status(201).json(instanceToPlain(momentInstance));
  }
}

export { DeleteMomentController };
