import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { pubPerm, userPerm } from '@config/constants';

import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { CreateAddressEventService } from '@services/Address/CreateAddressEvent/CreateAddressEventService';

class CreateAddressEventController {
  private createAddressEventService: CreateAddressEventService;

  constructor() {
    this.createAddressEventService = container.resolve(
      CreateAddressEventService,
    );
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { event_id, zip, street, uf, city, district, number, lat, long } =
      req.body;

    if (
      !hasPermission(req.user, userPerm) &&
      !hasPermission(req.user, pubPerm)
    ) {
      throw new AppError('Operação não permitida.', 403);
    }

    const addressEventInstance = await this.createAddressEventService.execute({
      event_id,
      user: req.user,
      zip,
      street,
      uf,
      city,
      district,
      number,
      lat,
      long,
    });

    return res.status(201).json(instanceToPlain(addressEventInstance));
  }
}

export { CreateAddressEventController };
