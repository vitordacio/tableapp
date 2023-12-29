import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { userPerm, pubPerm } from '@config/constants';
import { AppError } from '@utils/AppError';
import { hasPermission } from '@utils/hasPermission';
import { DeleteEventPerformerService } from '@services/Event/DeleteEvent/DeleteEventPerformerService';

class DeleteEventPerformerController {
  private deleteEventPerformerService: DeleteEventPerformerService;

  constructor() {
    this.deleteEventPerformerService = container.resolve(
      DeleteEventPerformerService,
    );
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { performer_id } = req.params;

    if (
      !hasPermission(req.user, userPerm) &&
      !hasPermission(req.user, pubPerm)
    ) {
      throw new AppError('Operação não permitida.', 403);
    }

    const event = await this.deleteEventPerformerService.execute({
      reqUser: req.user,
      performer_id,
    });

    return res.status(201).json(instanceToPlain(event));
  }
}

export { DeleteEventPerformerController };
