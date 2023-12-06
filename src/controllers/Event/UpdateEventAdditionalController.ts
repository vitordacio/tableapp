import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { userPerm, pubPerm } from '@config/constants';
import { AppError } from '@utils/AppError';
import { hasPermission } from '@utils/hasPermission';
import { UpdateEventAdditionalService } from '@services/Event/UpdateEvent/UpdateEventAdditionalService';

class UpdateEventAdditionalController {
  private updateEventAdditionalService: UpdateEventAdditionalService;

  constructor() {
    this.updateEventAdditionalService = container.resolve(
      UpdateEventAdditionalService,
    );
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { event_id, additional } = req.body;

    if (
      !hasPermission(req.user, userPerm) &&
      !hasPermission(req.user, pubPerm)
    ) {
      throw new AppError('Operação não permitida.', 403);
    }

    const event = await this.updateEventAdditionalService.execute({
      user: req.user,
      event_id,
      additional,
    });

    return res.status(200).json(instanceToPlain(event));
  }
}

export { UpdateEventAdditionalController };
