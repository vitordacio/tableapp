import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { userPerm, pubPerm } from '@config/constants';
import { AppError } from '@utils/AppError';
import { hasPermission } from '@utils/hasPermission';
import { UpdateEventLocationService } from '@services/Event/UpdateEvent/UpdateEventLocationService';

class UpdateEventLocationController {
  private updateEventLocationService: UpdateEventLocationService;

  constructor() {
    this.updateEventLocationService = container.resolve(
      UpdateEventLocationService,
    );
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { event_id, location } = req.body;

    if (
      !hasPermission(req.user, userPerm) &&
      !hasPermission(req.user, pubPerm)
    ) {
      throw new AppError('Operação não permitida.', 403);
    }

    const event = await this.updateEventLocationService.execute({
      user: req.user,
      event_id,
      location: location.trim(),
    });

    return res.status(200).json(instanceToPlain(event));
  }
}

export { UpdateEventLocationController };
