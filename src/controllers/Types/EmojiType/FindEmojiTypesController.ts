import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { userPerm, pubPerm } from '@config/constants';
import { FindEmojiTypesService } from '@services/Types/EmojiType/FindEmojiTypes/FindEmojiTypesService';

class FindEmojiTypesController {
  private findEmojiTypesService: FindEmojiTypesService;

  constructor() {
    this.findEmojiTypesService = container.resolve(FindEmojiTypesService);
  }

  async handle(req: Request, res: Response): Promise<Response> {
    if (
      !hasPermission(req.user, userPerm) &&
      !hasPermission(req.user, pubPerm)
    ) {
      throw new AppError('Operação não permitida.', 403);
    }

    const emojiTypeInstance = await this.findEmojiTypesService.execute();

    return res.status(200).json(instanceToPlain(emojiTypeInstance));
  }
}

export { FindEmojiTypesController };
