import { inject, injectable } from 'tsyringe';
import { v4 } from 'uuid';
import { EmojiType } from '@entities/EmojiType/EmojiType';
import { AppError } from '@utils/AppError';
import { IEmojiTypeRepository } from '@repositories/EmojiTypeRepository/IEmojiTypeRepository';

@injectable()
class CreateEmojiTypeService {
  constructor(
    @inject('EmojiTypeRepository')
    private emojiTypeRepository: IEmojiTypeRepository,
  ) {}

  async execute(category: string): Promise<EmojiType> {
    const [alreadyExists, lastInOrder] = await Promise.all([
      this.emojiTypeRepository.findByCategory(category),
      this.emojiTypeRepository.findLastInOrder(),
    ]);

    if (alreadyExists) {
      throw new AppError('Tipo de emoji já cadastrado.', 400);
    }

    const emojiType = this.emojiTypeRepository.create({
      id: v4(),
      category: category.toLowerCase(),
      order: lastInOrder ? lastInOrder.order + 1 : 1,
    });

    await this.emojiTypeRepository.save(emojiType);

    return emojiType;
  }
}

export { CreateEmojiTypeService };
