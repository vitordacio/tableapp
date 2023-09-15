import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { userPerm } from '@config/constants';
import { AppError } from '@utils/AppError';
import { hasPermission } from '@utils/hasPermission';
import { UpdateUserService } from '@services/User/UpdateUser/UpdateUserService';

class UpdateUserController {
  private updateUserService: UpdateUserService;

  constructor() {
    this.updateUserService = container.resolve(UpdateUserService);
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { name, bio, location, age, gender } = req.body;

    if (!hasPermission(req.user, userPerm)) {
      throw new AppError('Operação não permitida.', 403);
    }

    const user = await this.updateUserService.execute({
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

export { UpdateUserController };
