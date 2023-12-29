import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { userPerm, pubPerm } from '@config/constants';
import { FindBlockService } from '@services/Block/FindBlock/FindBlockService';

class FindBlockController {
  private findBlockService: FindBlockService;

  constructor() {
    this.findBlockService = container.resolve(FindBlockService);
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { user_id } = req.params;

    if (
      !hasPermission(req.user, userPerm) &&
      !hasPermission(req.user, pubPerm)
    ) {
      throw new AppError('Operação não permitida.', 403);
    }

    const blockInstance = await this.findBlockService.execute({
      user_id,
      reqUser: req.user,
    });

    return res.status(200).json(instanceToPlain(blockInstance));
  }
}

export { FindBlockController };