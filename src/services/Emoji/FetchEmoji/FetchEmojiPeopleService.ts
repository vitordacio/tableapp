import { inject, injectable } from 'tsyringe';
import { v4 } from 'uuid';
import { IEmojiRepository } from '@repositories/EmojiRepository/IEmojiRepository';
import { IEmojiTypeRepository } from '@repositories/EmojiTypeRepository/IEmojiTypeRepository';
import emojiPeople from '@config/fetch/emojiPeople';
import { AppError } from '@utils/AppError';
import { Emoji } from '@entities/Emoji/Emoji';

@injectable()
class FetchEmojiPeopleService {
  constructor(
    @inject('EmojiRepository')
    private emojiRepository: IEmojiRepository,

    @inject('EmojiTypeRepository')
    private emojiTypeRepository: IEmojiTypeRepository,
  ) {}

  async execute(): Promise<Emoji[]> {
    const newEmojiPeople: Emoji[] = [];

    const [emojis, category] = await Promise.all([
      this.emojiRepository.findByCategoryMaster('people'),
      this.emojiTypeRepository.findByCategory('people'),
    ]);

    if (!category) {
      throw new AppError('Categoria de emoji não encontrada', 400);
    }

    emojiPeople.forEach(data => {
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

      newEmojiPeople.push(newType);
    });

    await this.emojiRepository.saveMany(newEmojiPeople);

    return newEmojiPeople;
  }
}

export { FetchEmojiPeopleService };
