import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { masterPerm } from '@config/constants';
import { FetchMasterService } from '@services/Types/FetchMasterService';

class FetchMasterController {
  private fetchMasterService: FetchMasterService;

  constructor() {
    this.fetchMasterService = container.resolve(FetchMasterService);
  }

  async handle(req: Request, res: Response): Promise<Response> {
    if (!hasPermission(req.user, masterPerm)) {
      throw new AppError('Operação não permitida.', 403);
    }

    const masterInstance = await this.fetchMasterService.execute();

    return res.status(201).json(instanceToPlain(masterInstance));
  }
}

export { FetchMasterController };
