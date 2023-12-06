import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { userPerm, pubPerm } from '@config/constants';
import { AppError } from '@utils/AppError';
import { hasPermission } from '@utils/hasPermission';
import { UpdateEventPerformerService } from '@services/Event/UpdateEvent/UpdateEventPerformerService';

class UpdateEventPerformerController {
  private updateEventPerformerService: UpdateEventPerformerService;

  constructor() {
    this.updateEventPerformerService = container.resolve(
      UpdateEventPerformerService,
    );
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { event_id, performer } = req.body;

    if (
      !hasPermission(req.user, userPerm) &&
      !hasPermission(req.user, pubPerm)
    ) {
      throw new AppError('Operação não permitida.', 403);
    }

    const event = await this.updateEventPerformerService.execute({
      user: req.user,
      event_id,
      performer,
    });

    return res.status(200).json(instanceToPlain(event));
  }
}

export { UpdateEventPerformerController };
