import { inject, injectable } from 'tsyringe';
import { AppError } from '@utils/AppError';
import { IEmojiRepository } from '@repositories/EmojiRepository/IEmojiRepository';

@injectable()
class DeleteEmojiService {
  constructor(
    @inject('EmojiRepository')
    private emojiRepository: IEmojiRepository,
  ) {}

  async execute(emoji_id: string): Promise<void> {
    const emoji = await this.emojiRepository.findById(emoji_id);

    if (!emoji) {
      throw new AppError('Emoji não encontrado.', 404);
    }

    await this.emojiRepository.remove(emoji);
  }
}

export { DeleteEmojiService };
