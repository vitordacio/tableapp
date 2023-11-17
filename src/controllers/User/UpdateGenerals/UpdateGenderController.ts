import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { userPerm } from '@config/constants';
import { AppError } from '@utils/AppError';
import { hasPermission } from '@utils/hasPermission';
import { UpdateGenderService } from '@services/User/UpdateUser/UpdateGenderService';

class UpdateGenderController {
  private updateGenderService: UpdateGenderService;

  constructor() {
    this.updateGenderService = container.resolve(UpdateGenderService);
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { gender } = req.body;

    if (!hasPermission(req.user, userPerm)) {
      throw new AppError('Operação não permitida.', 403);
    }

    const user = await this.updateGenderService.execute({
      gender,
      user: req.user,
    });

    return res.status(200).json(instanceToPlain(user));
  }
}

export { UpdateGenderController };
