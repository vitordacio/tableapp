import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { FindCheckUpdateEmailService } from '@services/User/FindUser/FindCheckUpdateEmailService';
import { AppError } from '@utils/AppError';
import { userPerm, pubPerm } from '@config/constants';
import { hasPermission } from '@utils/hasPermission';

class FindCheckUpdateEmailController {
  private findCheckUpdateEmailService: FindCheckUpdateEmailService;

  constructor() {
    this.findCheckUpdateEmailService = container.resolve(
      FindCheckUpdateEmailService,
    );
  }

  async handle(req: Request, res: Response): Promise<Response> {
    if (
      !hasPermission(req.user, userPerm) &&
      !hasPermission(req.user, pubPerm)
    ) {
      throw new AppError('Operação não permitida.', 403);
    }

    const userInstance = await this.findCheckUpdateEmailService.execute(
      req.user,
    );

    return res.status(200).json(instanceToPlain(userInstance));
  }
}

export { FindCheckUpdateEmailController };
