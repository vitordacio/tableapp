import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { userPerm } from '@config/constants';
import { AppError } from '@utils/AppError';
import { hasPermission } from '@utils/hasPermission';

class UpdateTableController {
  private updateTableService: UpdateTableService;

  constructor() {
    this.updateTableService = container.resolve(UpdateTableService);
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { name } = req.body;

    if (!hasPermission(req.user, userPerm)) {
      throw new AppError('Operação não permitida.', 403);
    }

    const Table = await this.updateTableService.execute({
      requestUser: req.user,
      // TableId,
      fields: {
        name,
        // password,
        // address,
        // document,
        // surname,
        // email,
        // phone,
        // permissions,
        // is_locator,
      },
    });

    return res.status(200).json(instanceToPlain(Table));
  }
}

export { UpdateTableController };
