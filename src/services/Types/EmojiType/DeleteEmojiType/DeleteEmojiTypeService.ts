import { inject, injectable } from 'tsyringe';
import { AppError } from '@utils/AppError';
import { IEmojiTypeRepository } from '@repositories/EmojiTypeRepository/IEmojiTypeRepository';

@injectable()
class DeleteEmojiTypeService {
  constructor(
    @inject('EmojiTypeRepository')
    private emojiTypeRepository: IEmojiTypeRepository,
  ) {}

  async execute(type_id: string): Promise<void> {
    const emojiType = await this.emojiTypeRepository.findById(type_id);

    if (!emojiType) {
      throw new AppError('Tipo de emoji não encontrado.', 404);
    }

    await this.emojiTypeRepository.remove(emojiType);
  }
}

export { DeleteEmojiTypeService };
