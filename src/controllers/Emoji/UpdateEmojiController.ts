import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { masterPerm } from '@config/constants';
import { UpdateEmojiService } from '@services/Emoji/UpdateEmoji/UpdateEmojiService';

class UpdateEmojiController {
  private updateEmojiService: UpdateEmojiService;

  constructor() {
    this.updateEmojiService = container.resolve(UpdateEmojiService);
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { emoji_id, type_id, value, shorthand } = req.body;

    if (!hasPermission(req.user, masterPerm)) {
      throw new AppError('Operação não permitida.', 403);
    }

    const emojiInstance = await this.updateEmojiService.execute({
      emoji_id,
      type_id,
      value,
      shorthand,
    });

    return res.status(201).json(instanceToPlain(emojiInstance));
  }
}

export { UpdateEmojiController };
