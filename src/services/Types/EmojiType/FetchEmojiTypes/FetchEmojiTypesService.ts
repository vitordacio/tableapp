import { inject, injectable } from 'tsyringe';
import { v4 } from 'uuid';
import emojiType from '@config/fetch/emojiType';
import { EmojiType } from '@entities/EmojiType/EmojiType';
import { IEmojiTypeRepository } from '@repositories/EmojiTypeRepository/IEmojiTypeRepository';

@injectable()
class FetchEmojiTypesService {
  constructor(
    @inject('EmojiTypeRepository')
    private emojiTypeRepository: IEmojiTypeRepository,
  ) {}

  async execute(): Promise<EmojiType[]> {
    const newTypes: EmojiType[] = [];

    const types = await this.emojiTypeRepository.findIndex();

    emojiType.forEach(data => {
      const alreadyExists = types.some(type => type.category === data.category);

      if (alreadyExists) return;

      const newType = this.emojiTypeRepository.create({
        id: v4(),
        category: data.category,
        order: data.order,
      });

      newTypes.push(newType);
    });

    await this.emojiTypeRepository.saveMany(newTypes);

    return newTypes;
  }
}

export { FetchEmojiTypesService };
