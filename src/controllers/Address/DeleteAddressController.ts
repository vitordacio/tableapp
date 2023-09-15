import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { masterPerm } from '@config/constants';
import { DeleteAddressService } from '@services/Address/DeleteAddress/DeleteAddressService';

class DeleteAddressController {
  private deleteAddressService: DeleteAddressService;

  constructor() {
    this.deleteAddressService = container.resolve(DeleteAddressService);
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    if (!hasPermission(req.user, masterPerm)) {
      throw new AppError('Operação não permitida.', 403);
    }

    const addressInstance = await this.deleteAddressService.execute(id);

    return res.status(201).json(instanceToPlain(addressInstance));
  }
}

export { DeleteAddressController };
