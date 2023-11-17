import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { userPerm } from '@config/constants';
import { AppError } from '@utils/AppError';
import { hasPermission } from '@utils/hasPermission';
import { UpdateBioService } from '@services/User/UpdateUser/UpdateBioService';

class UpdateBioController {
  private updateBioService: UpdateBioService;

  constructor() {
    this.updateBioService = container.resolve(UpdateBioService);
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { bio } = req.body;

    if (!hasPermission(req.user, userPerm)) {
      throw new AppError('Operação não permitida.', 403);
    }

    const user = await this.updateBioService.execute({
      bio,
      user: req.user,
    });

    return res.status(200).json(instanceToPlain(user));
  }
}

export { UpdateBioController };
