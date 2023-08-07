import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { CreateMeetingService } from '@services/Meeting/CreateMeeting/CreateMeetingService';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { pubPerm, userPerm } from '@config/constants';

class CreateMeetingController {
  private createMeetingService: CreateMeetingService;

  constructor() {
    this.createMeetingService = container.resolve(CreateMeetingService);
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { type_id, name, location, description } = req.body;

    if (
      !hasPermission(req.user, userPerm) &&
      !hasPermission(req.user, pubPerm)
    ) {
      throw new AppError('Operação não permitida.', 403);
    }

    const meetingInstance = await this.createMeetingService.execute({
      type_id,
      name,
      location,
      description,
      user: req.user,
    });

    return res.status(201).json(instanceToPlain(meetingInstance));
  }
}

export { CreateMeetingController };
