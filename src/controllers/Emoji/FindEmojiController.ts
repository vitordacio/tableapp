import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { userPerm, pubPerm } from '@config/constants';
import { FindEmojiService } from '@services/Emoji/FindEmoji/FindEmojiService';

class FindEmojiController {
  private findEmojiService: FindEmojiService;

  constructor() {
    this.findEmojiService = container.resolve(FindEmojiService);
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { page, limit } = req.query;

    if (
      !hasPermission(req.user, userPerm) &&
      !hasPermission(req.user, pubPerm)
    ) {
      throw new AppError('Operação não permitida.', 403);
    }

    const emojiInstance = await this.findEmojiService.execute(
      parseInt(page as string, 10),
      parseInt(limit as string, 10),
    );

    return res.status(201).json(instanceToPlain(emojiInstance));
  }
}

export { FindEmojiController };
