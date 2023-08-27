import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { pubPerm } from '@config/constants';

import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { CreateAddressPubService } from '@services/Address/CreaterAddressPub/CreateAddressPubService';

class CreateAddressPubController {
  private createAddressPubService: CreateAddressPubService;

  constructor() {
    this.createAddressPubService = container.resolve(CreateAddressPubService);
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { zip, street, uf, city, district, number, lat, long } = req.body;

    if (!hasPermission(req.user, pubPerm)) {
      throw new AppError('Operação não permitida.', 403);
    }

    const addressInstance = await this.createAddressPubService.execute({
      zip,
      street,
      uf,
      city,
      district,
      number,
      lat,
      long,
      user: req.user,
    });

    return res.status(201).json(instanceToPlain(addressInstance));
  }
}

export { CreateAddressPubController };
