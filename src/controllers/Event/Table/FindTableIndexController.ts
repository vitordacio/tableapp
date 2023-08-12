import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { pubPerm, userPerm } from '@config/constants';
import { FindTableIndexService } from '@services/Event/Table/FindTable/FindTableIndexService';

class FindTableIndexController {
  private findTableIndexService: FindTableIndexService;

  constructor() {
    this.findTableIndexService = container.resolve(FindTableIndexService);
  }

  async handle(req: Request, res: Response): Promise<Response> {
    if (
      !hasPermission(req.user, userPerm) &&
      !hasPermission(req.user, pubPerm)
    ) {
      throw new AppError('Operação não permitida.', 403);
    }

    const tableInstance = await this.findTableIndexService.execute();

    return res.status(201).json(instanceToPlain(tableInstance));
  }
}

export { FindTableIndexController };
