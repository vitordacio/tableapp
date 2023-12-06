import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { userPerm, pubPerm } from '@config/constants';
import { AppError } from '@utils/AppError';
import { hasPermission } from '@utils/hasPermission';
import { UpdateEventAddressIdService } from '@services/Event/UpdateEvent/UpdateEventAddressIdService';

class UpdateEventAddressIdController {
  private updateEventAddressIdService: UpdateEventAddressIdService;

  constructor() {
    this.updateEventAddressIdService = container.resolve(
      UpdateEventAddressIdService,
    );
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { event_id, address_id } = req.body;

    if (
      !hasPermission(req.user, userPerm) &&
      !hasPermission(req.user, pubPerm)
    ) {
      throw new AppError('Operação não permitida.', 403);
    }

    const event = await this.updateEventAddressIdService.execute({
      user: req.user,
      event_id,
      address_id,
    });

    return res.status(200).json(instanceToPlain(event));
  }
}

export { UpdateEventAddressIdController };
