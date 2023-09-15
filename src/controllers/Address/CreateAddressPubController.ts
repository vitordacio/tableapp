import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { masterPerm } from '@config/constants';

import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { CreateAddressPubService } from '@services/Address/CreaterAddressPub/CreateAddressPubService';

class CreateAddressPubController {
  private createAddressPubService: CreateAddressPubService;

  constructor() {
    this.createAddressPubService = container.resolve(CreateAddressPubService);
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { user_id, lat, long, zip, street, uf, city, district, number } =
      req.body;

    if (!hasPermission(req.user, masterPerm)) {
      throw new AppError('Operação não permitida.', 403);
    }

    const addressInstance = await this.createAddressPubService.execute({
      user_id,
      lat,
      long,
      zip,
      street,
      uf,
      city,
      district,
      number,
    });

    return res.status(201).json(instanceToPlain(addressInstance));
  }
}

export { CreateAddressPubController };
