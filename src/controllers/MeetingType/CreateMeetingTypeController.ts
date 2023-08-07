import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { masterPerm } from '@config/constants';
import { CreateMeetingTypeService } from '@services/MeetingType/CreateMeetingType/CreateMeetingTypeService';

class CreateMeetingTypeController {
  private createMeetingService: CreateMeetingTypeService;

  constructor() {
    this.createMeetingService = container.resolve(CreateMeetingTypeService);
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { type, type_name } = req.body;

    if (!hasPermission(req.user, masterPerm)) {
      throw new AppError('Operação não permitida.', 403);
    }

    const meetingTypeInstance = await this.createMeetingService.execute({
      type,
      type_name,
    });

    return res.status(201).json(instanceToPlain(meetingTypeInstance));
  }
}

export { CreateMeetingTypeController };
