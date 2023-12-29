import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { pubPerm, userPerm } from '@config/constants';
import { CreateEventPerformerService } from '@services/Event/CreateEvent/CreateEventPerformer';

class CreateEventPerformerController {
  private createEventPerformerService: CreateEventPerformerService;

  constructor() {
    this.createEventPerformerService = container.resolve(
      CreateEventPerformerService,
    );
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { event_id, name, user_id } = req.body;

    if (
      !hasPermission(req.user, userPerm) &&
      !hasPermission(req.user, pubPerm)
    ) {
      throw new AppError('Operação não permitida.', 403);
    }

    const eventInstance = await this.createEventPerformerService.execute({
      reqUser: req.user,
      event_id,
      name,
      user_id,
    });

    return res.status(201).json(instanceToPlain(eventInstance));
  }
}

export { CreateEventPerformerController };
