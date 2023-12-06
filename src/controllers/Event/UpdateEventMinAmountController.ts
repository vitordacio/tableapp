import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { userPerm, pubPerm } from '@config/constants';
import { AppError } from '@utils/AppError';
import { hasPermission } from '@utils/hasPermission';
import { UpdateEventMinAmountService } from '@services/Event/UpdateEvent/UpdateEventMinAmountService';

class UpdateEventMinAmountController {
  private updateEventMinAmountService: UpdateEventMinAmountService;

  constructor() {
    this.updateEventMinAmountService = container.resolve(
      UpdateEventMinAmountService,
    );
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { event_id, min_amount } = req.body;

    if (
      !hasPermission(req.user, userPerm) &&
      !hasPermission(req.user, pubPerm)
    ) {
      throw new AppError('Operação não permitida.', 403);
    }

    const event = await this.updateEventMinAmountService.execute({
      user: req.user,
      event_id,
      min_amount,
    });

    return res.status(200).json(instanceToPlain(event));
  }
}

export { UpdateEventMinAmountController };
