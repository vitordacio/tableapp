import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { masterPerm } from '@config/constants';
import { FindEmojiByIdService } from '@services/Emoji/FindEmoji/FindEmojiByIdService';

class FindEmojiByIdController {
  private findEmojiService: FindEmojiByIdService;

  constructor() {
    this.findEmojiService = container.resolve(FindEmojiByIdService);
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { emoji_id } = req.body;

    if (!hasPermission(req.user, masterPerm)) {
      throw new AppError('Operação não permitida.', 403);
    }

    const emojiInstance = await this.findEmojiService.execute(emoji_id);

    return res.status(201).json(instanceToPlain(emojiInstance));
  }
}

export { FindEmojiByIdController };
