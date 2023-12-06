import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { userPerm, pubPerm } from '@config/constants';
import { AppError } from '@utils/AppError';
import { hasPermission } from '@utils/hasPermission';
import { UpdateEventTicketsValueService } from '@services/Event/UpdateEvent/UpdateEventTicketsValueService';

class UpdateEventTicketsValueController {
  private updateEventTicketsValueService: UpdateEventTicketsValueService;

  constructor() {
    this.updateEventTicketsValueService = container.resolve(
      UpdateEventTicketsValueService,
    );
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { event_id, ticket_value } = req.body;

    if (
      !hasPermission(req.user, userPerm) &&
      !hasPermission(req.user, pubPerm)
    ) {
      throw new AppError('Operação não permitida.', 403);
    }

    const event = await this.updateEventTicketsValueService.execute({
      user: req.user,
      event_id,
      ticket_value,
    });

    return res.status(200).json(instanceToPlain(event));
  }
}

export { UpdateEventTicketsValueController };
