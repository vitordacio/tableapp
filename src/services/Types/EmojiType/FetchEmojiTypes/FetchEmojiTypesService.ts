import { inject, injectable } from 'tsyringe';
import { v4 } from 'uuid';
import { EmojiType } from '@entities/EmojiType/EmojiType';
import { IEmojiTypeRepository } from '@repositories/EmojiTypeRepository/IEmojiTypeRepository';

@injectable()
class FetchEmojiTypesService {
  constructor(
    @inject('EmojiTypeRepository')
    private emojiTypeRepository: IEmojiTypeRepository,
  ) {}

  async execute(): Promise<EmojiType[]> {
    const fetchData = [
      {
        category: 'face',
        order: 1,
      },
      {
        category: 'body',
        order: 2,
      },
      {
        category: 'people',
        order: 3,
      },
      {
        category: 'animal',
        order: 4,
      },
      {
        category: 'symbol',
        order: 5,
      },
    ];

    const newTypes: EmojiType[] = [];

    const types = await this.emojiTypeRepository.findIndex();

    fetchData.forEach(data => {
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
