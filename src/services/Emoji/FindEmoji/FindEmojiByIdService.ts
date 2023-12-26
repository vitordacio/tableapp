import { inject, injectable } from 'tsyringe';
import { Emoji } from '@entities/Emoji/Emoji';
import { IEmojiRepository } from '@repositories/EmojiRepository/IEmojiRepository';
import { AppError } from '@utils/AppError';

@injectable()
class FindEmojiByIdService {
  constructor(
    @inject('EmojiRepository')
    private emojiRepository: IEmojiRepository,
  ) {}

  async execute(emoji_id: string): Promise<Emoji> {
    const emoji = await this.emojiRepository.findById(emoji_id);

    if (!emoji) {
      throw new AppError('Emoji não encontrado.', 404);
    }

    return emoji;
  }
}

export { FindEmojiByIdService };
