import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { userPerm, pubPerm } from '@config/constants';
import { FindEmojiSymbolService } from '@services/Emoji/FindEmoji/FindEmojiSymbolService';

class FindEmojiSymbolController {
  private findEmojiSymbolService: FindEmojiSymbolService;

  constructor() {
    this.findEmojiSymbolService = container.resolve(FindEmojiSymbolService);
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { page, limit } = req.params;

    if (
      !hasPermission(req.user, userPerm) &&
      !hasPermission(req.user, pubPerm)
    ) {
      throw new AppError('Operação não permitida.', 403);
    }

    const emojiInstance = await this.findEmojiSymbolService.execute(
      parseInt(page as string, 10),
      parseInt(limit as string, 10),
    );

    return res.status(201).json(instanceToPlain(emojiInstance));
  }
}

export { FindEmojiSymbolController };
