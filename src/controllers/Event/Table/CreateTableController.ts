import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { pubPerm, userPerm } from '@config/constants';
import { CreateTableService } from '@services/Event/Table/CreateTable/CreateTableService';

class CreateTableController {
  private createTableService: CreateTableService;

  constructor() {
    this.createTableService = container.resolve(CreateTableService);
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const {
      name,
      location,
      time,
      additional,
      drink_preferences,
      age_limit,
      free_woman,
      free_man,
    } = req.body;

    if (
      !hasPermission(req.user, userPerm) &&
      !hasPermission(req.user, pubPerm)
    ) {
      throw new AppError('Operação não permitida.', 403);
    }

    const tableInstance = await this.createTableService.execute({
      name,
      location,
      time,
      additional,
      drink_preferences,
      age_limit,
      free_woman,
      free_man,
      user: req.user,
    });

    return res.status(201).json(instanceToPlain(tableInstance));
  }
}

export { CreateTableController };
