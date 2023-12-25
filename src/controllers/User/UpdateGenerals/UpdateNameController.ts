import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { userPerm } from '@config/constants';
import { AppError } from '@utils/AppError';
import { hasPermission } from '@utils/hasPermission';
import { UpdateNameService } from '@services/User/UpdateUser/UpdateNameService';

class UpdateNameController {
  private updateNameService: UpdateNameService;

  constructor() {
    this.updateNameService = container.resolve(UpdateNameService);
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { name } = req.body;

    if (!hasPermission(req.user, userPerm)) {
      throw new AppError('Operação não permitida.', 403);
    }

    const user = await this.updateNameService.execute({
      name: name.trim(),
      user: req.user,
    });

    return res.status(200).json(instanceToPlain(user));
  }
}

export { UpdateNameController };
