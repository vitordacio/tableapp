import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { userPerm } from '@config/constants';
import { AppError } from '@utils/AppError';
import { hasPermission } from '@utils/hasPermission';
import { UpdateLocationService } from '@services/User/UpdateUser/Generals/UpdateLocationService';

class UpdateLocationController {
  private updateLocationService: UpdateLocationService;

  constructor() {
    this.updateLocationService = container.resolve(UpdateLocationService);
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { location } = req.body;

    if (!hasPermission(req.user, userPerm)) {
      throw new AppError('Operação não permitida.', 403);
    }

    const user = await this.updateLocationService.execute({
      location,
      user: req.user,
    });

    return res.status(200).json(instanceToPlain(user));
  }
}

export { UpdateLocationController };
