import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { masterPerm } from '@config/constants';
import { FetchEmojiService } from '@services/Emoji/FetchEmoji/FetchEmojiService';

class FetchEmojiController {
  private fetchEmojiService: FetchEmojiService;

  constructor() {
    this.fetchEmojiService = container.resolve(FetchEmojiService);
  }

  async handle(req: Request, res: Response): Promise<Response> {
    if (!hasPermission(req.user, masterPerm)) {
      throw new AppError('Operação não permitida.', 403);
    }

    const emojiInstance = await this.fetchEmojiService.execute();

    return res.status(201).json(instanceToPlain(emojiInstance));
  }
}

export { FetchEmojiController };
