import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { pubPerm, userPerm } from '@config/constants';
import { FindMeetingService } from '@services/Meeting/FindMeeting/FindMeetingService';

class FindMeetingController {
  private findMeetingService: FindMeetingService;

  constructor() {
    this.findMeetingService = container.resolve(FindMeetingService);
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    if (
      !hasPermission(req.user, userPerm) &&
      !hasPermission(req.user, pubPerm)
    ) {
      throw new AppError('Operação não permitida.', 403);
    }

    const meetingInstance = await this.findMeetingService.execute(id);

    return res.status(201).json(instanceToPlain(meetingInstance));
  }
}

export { FindMeetingController };
