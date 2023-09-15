import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { masterPerm } from '@config/constants';

import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { FindAddressIndexService } from '@services/Address/FindAddress/FindAddressIndexService';

class FindAddressIndexController {
  private findAddressIndexService: FindAddressIndexService;

  constructor() {
    this.findAddressIndexService = container.resolve(FindAddressIndexService);
  }

  async handle(req: Request, res: Response): Promise<Response> {
    if (!hasPermission(req.user, masterPerm)) {
      throw new AppError('Operação não permitida.', 403);
    }

    const addressEventInstance = await this.findAddressIndexService.execute();

    return res.status(201).json(instanceToPlain(addressEventInstance));
  }
}

export { FindAddressIndexController };
