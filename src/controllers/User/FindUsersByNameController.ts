import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { userPerm, pubPerm } from '@config/constants';
import { FindUsersByNameService } from '@services/User/FindUser/FindUsersByNameService';

class FindUsersByNameController {
  private findUserByNameService: FindUsersByNameService;

  constructor() {
    this.findUserByNameService = container.resolve(FindUsersByNameService);
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { name, page, limit } = req.query;

    if (
      !hasPermission(req.user, userPerm) &&
      !hasPermission(req.user, pubPerm)
    ) {
      throw new AppError('Operação não permitida.', 403);
    }

    const userInstance = await this.findUserByNameService.execute({
      reqUser: req.user,
      name: name as string,
      page: parseInt(page as string, 10),
      limit: parseInt(limit as string, 10),
    });

    return res.status(201).json(instanceToPlain(userInstance));
  }
}

export { FindUsersByNameController };
