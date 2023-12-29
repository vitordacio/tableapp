import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { FindCheckUpdateService } from '@services/User/FindUser/FindCheckUpdateService';
import { AppError } from '@utils/AppError';
import { userPerm, pubPerm } from '@config/constants';
import { hasPermission } from '@utils/hasPermission';

class FindCheckUpdateController {
  private findCheckUpdateService: FindCheckUpdateService;

  constructor() {
    this.findCheckUpdateService = container.resolve(FindCheckUpdateService);
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { type } = req.params;
    if (
      !hasPermission(req.user, userPerm) &&
      !hasPermission(req.user, pubPerm)
    ) {
      throw new AppError('Operação não permitida.', 403);
    }

    const userInstance = await this.findCheckUpdateService.execute({
      type,
      reqUser: req.user,
    });

    return res.status(200).json(instanceToPlain(userInstance));
  }
}

export { FindCheckUpdateController };
