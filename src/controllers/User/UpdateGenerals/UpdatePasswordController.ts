import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { userPerm } from '@config/constants';
import { AppError } from '@utils/AppError';
import { hasPermission } from '@utils/hasPermission';
import { UpdatePasswordService } from '@services/User/UpdateUser/Generals/UpdatePasswordService';

class UpdatePasswordController {
  private updatePasswordService: UpdatePasswordService;

  constructor() {
    this.updatePasswordService = container.resolve(UpdatePasswordService);
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { password } = req.body;

    if (!hasPermission(req.user, userPerm)) {
      throw new AppError('Operação não permitida.', 403);
    }

    const user = await this.updatePasswordService.execute({
      password,
      user: req.user,
    });

    return res.status(200).json(instanceToPlain(user));
  }
}

export { UpdatePasswordController };
