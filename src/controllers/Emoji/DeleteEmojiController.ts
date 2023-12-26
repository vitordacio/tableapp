import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { masterPerm } from '@config/constants';
import { DeleteEmojiService } from '@services/Emoji/DeleteEmoji/DeleteEmojiService';

class DeleteEmojiController {
  private deleteEmojiService: DeleteEmojiService;

  constructor() {
    this.deleteEmojiService = container.resolve(DeleteEmojiService);
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { emoji_id } = req.body;

    if (!hasPermission(req.user, masterPerm)) {
      throw new AppError('Operação não permitida.', 403);
    }

    const emojiInstance = await this.deleteEmojiService.execute(emoji_id);

    return res.status(201).json(instanceToPlain(emojiInstance));
  }
}

export { DeleteEmojiController };
