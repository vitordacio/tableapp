import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { pubPerm, userPerm } from '@config/constants';
import { FindReactByIdService } from '@services/React/FindReact/FindReactByIdService';

class FindReactByIdController {
  private findReactByIdService: FindReactByIdService;

  constructor() {
    this.findReactByIdService = container.resolve(FindReactByIdService);
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { react_id } = req.params;

    if (
      !hasPermission(req.user, userPerm) &&
      !hasPermission(req.user, pubPerm)
    ) {
      throw new AppError('Operação não permitida.', 403);
    }

    const reactInstance = await this.findReactByIdService.execute(react_id);

    return res.status(200).json(instanceToPlain(reactInstance));
  }
}

export { FindReactByIdController };
