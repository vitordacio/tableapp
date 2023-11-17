import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { userPerm } from '@config/constants';
import { AppError } from '@utils/AppError';
import { hasPermission } from '@utils/hasPermission';
import { UpdateEmailService } from '@services/User/UpdateUser/UpdateEmailService';

class UpdateEmailController {
  private updateEmailService: UpdateEmailService;

  constructor() {
    this.updateEmailService = container.resolve(UpdateEmailService);
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;

    if (!hasPermission(req.user, userPerm)) {
      throw new AppError('Operação não permitida.', 403);
    }

    const user = await this.updateEmailService.execute({
      email,
      user: req.user,
    });

    return res.status(200).json(instanceToPlain(user));
  }
}

export { UpdateEmailController };
