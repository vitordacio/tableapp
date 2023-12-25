import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { FindCheckUpdateNameService } from '@services/User/FindUser/FindCheckUpdateNameService';
import { AppError } from '@utils/AppError';
import { userPerm, pubPerm } from '@config/constants';
import { hasPermission } from '@utils/hasPermission';

class FindCheckUpdateNameController {
  private findCheckUpdateNameService: FindCheckUpdateNameService;

  constructor() {
    this.findCheckUpdateNameService = container.resolve(
      FindCheckUpdateNameService,
    );
  }

  async handle(req: Request, res: Response): Promise<Response> {
    if (
      !hasPermission(req.user, userPerm) &&
      !hasPermission(req.user, pubPerm)
    ) {
      throw new AppError('Operação não permitida.', 403);
    }

    const userInstance = await this.findCheckUpdateNameService.execute(
      req.user,
    );

    return res.status(200).json(instanceToPlain(userInstance));
  }
}

export { FindCheckUpdateNameController };
