import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { userPerm, pubPerm } from '@config/constants';
import { FindUserByNameService } from '@services/User/FindUser/FindUsersByName';

class FindUserByNameController {
  private findUserByNameService: FindUserByNameService;

  constructor() {
    this.findUserByNameService = container.resolve(FindUserByNameService);
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { name, page, limit } = req.query;

    if (
      !hasPermission(req.user, userPerm) &&
      !hasPermission(req.user, pubPerm)
    ) {
      throw new AppError('Operação não permitida.', 403);
    }

    const UserInstance = await this.findUserByNameService.execute(
      name as string,
      parseInt(page as string, 10) || 1,
      parseInt(limit as string, 10) || 15,
    );

    return res.status(201).json(instanceToPlain(UserInstance));
  }
}

export { FindUserByNameController };
