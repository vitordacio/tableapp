import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { userPerm } from '@config/constants';
import { AppError } from '@utils/AppError';
import { hasPermission } from '@utils/hasPermission';
import { UpdateUsernameService } from '@services/User/UpdateUser/Generals/UpdateUsernameService';

class UpdateUsernameController {
  private updateUsernameService: UpdateUsernameService;

  constructor() {
    this.updateUsernameService = container.resolve(UpdateUsernameService);
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { username } = req.body;

    if (!hasPermission(req.user, userPerm)) {
      throw new AppError('Operação não permitida.', 403);
    }

    const user = await this.updateUsernameService.execute({
      username,
      user: req.user,
    });

    return res.status(200).json(instanceToPlain(user));
  }
}

export { UpdateUsernameController };
