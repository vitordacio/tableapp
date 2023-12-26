import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { masterPerm } from '@config/constants';
import { CreateEmojiService } from '@services/Emoji/CreateEmoji/CreateEmojiService';

class CreateEmojiController {
  private createEmojiService: CreateEmojiService;

  constructor() {
    this.createEmojiService = container.resolve(CreateEmojiService);
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { type_id, value, shorthand } = req.body;

    if (!hasPermission(req.user, masterPerm)) {
      throw new AppError('Operação não permitida.', 403);
    }

    const emojiInstance = await this.createEmojiService.execute({
      type_id,
      value,
      shorthand,
    });

    return res.status(201).json(instanceToPlain(emojiInstance));
  }
}

export { CreateEmojiController };
