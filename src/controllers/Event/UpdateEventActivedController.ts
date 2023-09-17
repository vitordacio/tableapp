import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { userPerm, pubPerm } from '@config/constants';
import { AppError } from '@utils/AppError';
import { hasPermission } from '@utils/hasPermission';
import { UpdateEventActivedService } from '@services/Event/UpdateEvent/UpdateEventActivedService';

class UpdateEventActivedController {
  private updateEventActivedService: UpdateEventActivedService;

  constructor() {
    this.updateEventActivedService = container.resolve(
      UpdateEventActivedService,
    );
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { event_id, actived } = req.body;

    if (
      !hasPermission(req.user, userPerm) &&
      !hasPermission(req.user, pubPerm)
    ) {
      throw new AppError('Operação não permitida.', 403);
    }

    const event = await this.updateEventActivedService.execute({
      user: req.user,
      event_id,
      actived,
    });

    return res.status(200).json(instanceToPlain(event));
  }
}

export { UpdateEventActivedController };
