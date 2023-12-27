import { inject, injectable } from 'tsyringe';
import { Emoji } from '@entities/Emoji/Emoji';
import { IEmojiRepository } from '@repositories/EmojiRepository/IEmojiRepository';
import { AppError } from '@utils/AppError';

@injectable()
class FindEmojiFaceService {
  constructor(
    @inject('EmojiRepository')
    private emojiRepository: IEmojiRepository,
  ) {}

  async execute(page?: number, limit?: number): Promise<Emoji[]> {
    const emojis = await this.emojiRepository.findByCategory(
      'face',
      page || 1,
      limit || 50,
    );

    if (!emojis) {
      throw new AppError('Emojis não encontrados.', 404);
    }

    return emojis;
  }
}

export { FindEmojiFaceService };
