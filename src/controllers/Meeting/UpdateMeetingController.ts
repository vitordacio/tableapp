import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { userPerm } from '@config/constants';
import { AppError } from '@utils/AppError';
import { hasPermission } from '@utils/hasPermission';
import { UpdateMeetingService } from '@services/Meeting/UpdateMeeting/UpdateMeetingService';

class UpdateMeetingController {
  private updateMeetingService: UpdateMeetingService;

  constructor() {
    this.updateMeetingService = container.resolve(UpdateMeetingService);
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { name } = req.body;

    if (!hasPermission(req.user, userPerm)) {
      throw new AppError('Operação não permitida.', 403);
    }

    const meeting = await this.updateMeetingService.execute({
      requestUser: req.user,
      // MeetingId,
      fields: {
        name,
        // password,
        // address,
        // document,
        // surname,
        // email,
        // phone,
        // permissions,
        // is_locator,
      },
    });

    return res.status(200).json(instanceToPlain(meeting));
  }
}

export { UpdateMeetingController };
