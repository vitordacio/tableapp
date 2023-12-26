import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { masterPerm } from '@config/constants';
import { FetchEmojiTypesService } from '@services/Types/EmojiType/FetchEmojiTypes/FetchEmojiTypesService';

class FetchEmojiTypesController {
  private fetchEmojiTypesService: FetchEmojiTypesService;

  constructor() {
    this.fetchEmojiTypesService = container.resolve(FetchEmojiTypesService);
  }

  async handle(req: Request, res: Response): Promise<Response> {
    if (!hasPermission(req.user, masterPerm)) {
      throw new AppError('Operação não permitida.', 403);
    }

    const emojiTypeInstance = await this.fetchEmojiTypesService.execute();

    return res.status(201).json(instanceToPlain(emojiTypeInstance));
  }
}

export { FetchEmojiTypesController };
