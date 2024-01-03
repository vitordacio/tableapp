import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { masterPerm } from '@config/constants';
import { CreateEmojiTypeService } from '@services/Types/EmojiType/CreateEmojiType/CreateEmojiTypeService';

class CreateEmojiTypeController {
  private createEmojiTypeService: CreateEmojiTypeService;

  constructor() {
    this.createEmojiTypeService = container.resolve(CreateEmojiTypeService);
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { category } = req.body;

    if (!hasPermission(req.user, masterPerm)) {
      throw new AppError('Operação não permitida.', 403);
    }

    const emojiTypeInstance = await this.createEmojiTypeService.execute(
      category,
    );

    return res.status(201).json(instanceToPlain(emojiTypeInstance));
  }
}

export { CreateEmojiTypeController };
