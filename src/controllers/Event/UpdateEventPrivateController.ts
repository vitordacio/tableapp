import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { userPerm, pubPerm } from '@config/constants';
import { AppError } from '@utils/AppError';
import { hasPermission } from '@utils/hasPermission';
import { UpdateEventPrivateService } from '@services/Event/UpdateEvent/UpdateEventPrivateService';

class UpdateEventPrivateController {
  private updateEventPrivateService: UpdateEventPrivateService;

  constructor() {
    this.updateEventPrivateService = container.resolve(
      UpdateEventPrivateService,
    );
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { event_id, is_private } = req.body;

    if (
      !hasPermission(req.user, userPerm) &&
      !hasPermission(req.user, pubPerm)
    ) {
      throw new AppError('Operação não permitida.', 403);
    }

    const event = await this.updateEventPrivateService.execute({
      user: req.user,
      event_id,
      is_private,
    });

    return res.status(200).json(instanceToPlain(event));
  }
}

export { UpdateEventPrivateController };
