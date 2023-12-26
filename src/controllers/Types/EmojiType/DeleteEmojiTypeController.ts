import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { masterPerm } from '@config/constants';
import { DeleteEmojiTypeService } from '@services/Types/EmojiType/DeleteEmojiType/DeleteEmojiTypeService';

class DeleteEmojiTypeController {
  private deleteEmojiTypeService: DeleteEmojiTypeService;

  constructor() {
    this.deleteEmojiTypeService = container.resolve(DeleteEmojiTypeService);
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    if (!hasPermission(req.user, masterPerm)) {
      throw new AppError('Operação não permitida.', 403);
    }

    const emojiTypeInstance = await this.deleteEmojiTypeService.execute(id);

    return res.status(201).json(instanceToPlain(emojiTypeInstance));
  }
}

export { DeleteEmojiTypeController };
