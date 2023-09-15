import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { userPerm } from '@config/constants';
import { AppError } from '@utils/AppError';
import { hasPermission } from '@utils/hasPermission';
import { UpdatePictureService } from '@services/User/UpdateUser/Generals/UpdatePictureService';

class UpdatePictureController {
  private updatePictureService: UpdatePictureService;

  constructor() {
    this.updatePictureService = container.resolve(UpdatePictureService);
  }

  async handle(req: Request, res: Response): Promise<Response> {
    if (!hasPermission(req.user, userPerm)) {
      throw new AppError('Operação não permitida.', 403);
    }

    const user = await this.updatePictureService.execute({
      name,
      bio,
      location,
      age,
      gender,
      user: req.user,
    });

    return res.status(200).json(instanceToPlain(user));
  }
}

export { UpdatePictureController };
