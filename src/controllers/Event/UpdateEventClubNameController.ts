import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { userPerm, pubPerm } from '@config/constants';
import { AppError } from '@utils/AppError';
import { hasPermission } from '@utils/hasPermission';
import { UpdateEventClubNameService } from '@services/Event/UpdateEvent/UpdateEventClubNameService';

class UpdateEventClubNameController {
  private updateEventClubNameService: UpdateEventClubNameService;

  constructor() {
    this.updateEventClubNameService = container.resolve(
      UpdateEventClubNameService,
    );
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { event_id, club_name } = req.body;

    if (
      !hasPermission(req.user, userPerm) &&
      !hasPermission(req.user, pubPerm)
    ) {
      throw new AppError('Operação não permitida.', 403);
    }

    const event = await this.updateEventClubNameService.execute({
      user: req.user,
      event_id,
      club_name,
    });

    return res.status(200).json(instanceToPlain(event));
  }
}

export { UpdateEventClubNameController };
