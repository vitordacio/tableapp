import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { pubPerm, userPerm } from '@config/constants';
import { DeleteReactService } from '@services/React/DeleteReact/DeleteReactService';

class DeleteReactController {
  private deleteReactService: DeleteReactService;

  constructor() {
    this.deleteReactService = container.resolve(DeleteReactService);
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { react_id } = req.params;

    if (
      !hasPermission(req.user, userPerm) &&
      !hasPermission(req.user, pubPerm)
    ) {
      throw new AppError('Operação não permitida.', 403);
    }

    const reactInstance = await this.deleteReactService.execute({
      react_id,
      reqUser: req.user,
    });

    return res.status(201).json(instanceToPlain(reactInstance));
  }
}

export { DeleteReactController };
