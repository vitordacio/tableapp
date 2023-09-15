import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { userPerm } from '@config/constants';
import { AppError } from '@utils/AppError';
import { hasPermission } from '@utils/hasPermission';
import { UpdatePrivateService } from '@services/User/UpdateUser/Generals/UpdatePrivateService';

class UpdatePrivateController {
  private updatePrivateService: UpdatePrivateService;

  constructor() {
    this.updatePrivateService = container.resolve(UpdatePrivateService);
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { private: set_private } = req.body;

    if (!hasPermission(req.user, userPerm)) {
      throw new AppError('Operação não permitida.', 403);
    }

    const user = await this.updatePrivateService.execute({
      set_private,
      user: req.user,
    });

    return res.status(200).json(instanceToPlain(user));
  }
}

export { UpdatePrivateController };
