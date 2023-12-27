import { inject, injectable } from 'tsyringe';
import { v4 } from 'uuid';
import { IEmojiRepository } from '@repositories/EmojiRepository/IEmojiRepository';
import { IEmojiTypeRepository } from '@repositories/EmojiTypeRepository/IEmojiTypeRepository';
import emojiSymbol from '@config/fetch/emojiSymbol';
import { AppError } from '@utils/AppError';
import { Emoji } from '@entities/Emoji/Emoji';

@injectable()
class FetchEmojiSymbolService {
  constructor(
    @inject('EmojiRepository')
    private emojiRepository: IEmojiRepository,

    @inject('EmojiTypeRepository')
    private emojiTypeRepository: IEmojiTypeRepository,
  ) {}

  async execute(): Promise<Emoji[]> {
    const newEmojiSymbols: Emoji[] = [];

    const [emojis, category] = await Promise.all([
      this.emojiRepository.findByCategoryMaster('symbol'),
      this.emojiTypeRepository.findByCategory('symbol'),
    ]);

    if (!category) {
      throw new AppError('Categoria de emoji não encontrada', 400);
    }

    emojiSymbol.forEach(data => {
      const alreadyExists = emojis.some(
        emoji => emoji.shorthand === data.shorthand,
      );

      if (alreadyExists) return;

      const newType = this.emojiRepository.create({
        id: v4(),
        type_id: category.id_emoji_type,
        value: data.value,
        shorthand: data.shorthand,
        order: data.order,
      });

      newEmojiSymbols.push(newType);
    });

    await this.emojiRepository.saveMany(newEmojiSymbols);

    return newEmojiSymbols;
  }
}

export { FetchEmojiSymbolService };
