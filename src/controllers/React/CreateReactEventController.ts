import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { pubPerm, userPerm } from '@config/constants';
import { CreateReactEventService } from '@services/React/CreateReact/CreateReactEventService';

class CreateReactEventController {
  private createReactEventService: CreateReactEventService;

  constructor() {
    this.createReactEventService = container.resolve(CreateReactEventService);
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { event_id, emoji_id, message } = req.body;

    if (
      !hasPermission(req.user, userPerm) &&
      !hasPermission(req.user, pubPerm)
    ) {
      throw new AppError('Operação não permitida.', 403);
    }

    const reactInstance = await this.createReactEventService.execute({
      reqUser: req.user,
      emoji_id,
      event_id,
      message,
    });

    return res.status(201).json(instanceToPlain(reactInstance));
  }
}

export { CreateReactEventController };
