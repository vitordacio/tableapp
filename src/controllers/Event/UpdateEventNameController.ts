import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { userPerm, pubPerm } from '@config/constants';
import { AppError } from '@utils/AppError';
import { hasPermission } from '@utils/hasPermission';
import { UpdateEventNameService } from '@services/Event/UpdateEvent/UpdateEventNameService';

class UpdateEventNameController {
  private updateEventNameService: UpdateEventNameService;

  constructor() {
    this.updateEventNameService = container.resolve(UpdateEventNameService);
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { event_id, name } = req.body;

    if (
      !hasPermission(req.user, userPerm) &&
      !hasPermission(req.user, pubPerm)
    ) {
      throw new AppError('Operação não permitida.', 403);
    }

    const event = await this.updateEventNameService.execute({
      user: req.user,
      event_id,
      name: name.trim(),
    });

    return res.status(200).json(instanceToPlain(event));
  }
}

export { UpdateEventNameController };
