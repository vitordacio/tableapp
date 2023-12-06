import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { userPerm, pubPerm } from '@config/constants';
import { AppError } from '@utils/AppError';
import { hasPermission } from '@utils/hasPermission';
import { UpdateEventDrinkPreferencesService } from '@services/Event/UpdateEvent/UpdateEventDrinkPreferencesService';

class UpdateEventDrinkPreferencesController {
  private updateEventDrinkPreferencesService: UpdateEventDrinkPreferencesService;

  constructor() {
    this.updateEventDrinkPreferencesService = container.resolve(
      UpdateEventDrinkPreferencesService,
    );
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { event_id, drink_preferences } = req.body;

    if (
      !hasPermission(req.user, userPerm) &&
      !hasPermission(req.user, pubPerm)
    ) {
      throw new AppError('Operação não permitida.', 403);
    }

    const event = await this.updateEventDrinkPreferencesService.execute({
      user: req.user,
      event_id,
      drink_preferences,
    });

    return res.status(200).json(instanceToPlain(event));
  }
}

export { UpdateEventDrinkPreferencesController };
