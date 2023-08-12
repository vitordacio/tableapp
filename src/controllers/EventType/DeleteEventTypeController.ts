import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { masterPerm } from '@config/constants';
import { DeleteEventTypeService } from '@services/EventType/DeleteEventType/DeleteEventTypeService';

class DeleteEventTypeController {
  private deleteEventTypeService: DeleteEventTypeService;

  constructor() {
    this.deleteEventTypeService = container.resolve(DeleteEventTypeService);
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    if (!hasPermission(req.user, masterPerm)) {
      throw new AppError('Operação não permitida.', 403);
    }

    const eventInstance = await this.deleteEventTypeService.execute(id);

    return res.status(201).json(instanceToPlain(eventInstance));
  }
}

export { DeleteEventTypeController };
