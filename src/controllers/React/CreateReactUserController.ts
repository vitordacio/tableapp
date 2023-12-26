import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { pubPerm, userPerm } from '@config/constants';
import { CreateReactUserService } from '@services/React/CreateReact/CreateReactUserService';

class CreateReactUserController {
  private createReactUserService: CreateReactUserService;

  constructor() {
    this.createReactUserService = container.resolve(CreateReactUserService);
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { emoji_id, message } = req.body;
    const { user_id } = req.params;

    if (
      !hasPermission(req.user, userPerm) &&
      !hasPermission(req.user, pubPerm)
    ) {
      throw new AppError('Operação não permitida.', 403);
    }

    const reactInstance = await this.createReactUserService.execute({
      reqUser: req.user,
      emoji_id,
      user_id,
      message,
    });

    return res.status(201).json(instanceToPlain(reactInstance));
  }
}

export { CreateReactUserController };
