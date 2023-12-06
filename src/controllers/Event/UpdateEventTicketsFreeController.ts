import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { userPerm, pubPerm } from '@config/constants';
import { AppError } from '@utils/AppError';
import { hasPermission } from '@utils/hasPermission';
import { UpdateEventTicketsFreeService } from '@services/Event/UpdateEvent/UpdateEventTicketsFreeService';

class UpdateEventTicketsFreeController {
  private updateEventTicketsFreeService: UpdateEventTicketsFreeService;

  constructor() {
    this.updateEventTicketsFreeService = container.resolve(
      UpdateEventTicketsFreeService,
    );
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { event_id, tickets_free } = req.body;

    if (
      !hasPermission(req.user, userPerm) &&
      !hasPermission(req.user, pubPerm)
    ) {
      throw new AppError('Operação não permitida.', 403);
    }

    const event = await this.updateEventTicketsFreeService.execute({
      user: req.user,
      event_id,
      tickets_free,
    });

    return res.status(200).json(instanceToPlain(event));
  }
}

export { UpdateEventTicketsFreeController };
