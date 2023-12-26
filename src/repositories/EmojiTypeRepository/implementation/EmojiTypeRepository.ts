import { getRepository, Repository } from 'typeorm';
import { IEmojiType } from '@entities/EmojiType/IEmojiType';
import { EmojiType } from '@entities/EmojiType/EmojiType';
import { IEmojiTypeRepository } from '../IEmojiTypeRepository';

class EmojiTypeRepository implements IEmojiTypeRepository {
  private ormRepository: Repository<EmojiType>;

  constructor() {
    this.ormRepository = getRepository(EmojiType);
  }

  create(data: IEmojiType): EmojiType {
    const emoji = this.ormRepository.create({
      id_emoji_type: data.id,
      category: data.category.trim().toLowerCase(),
      order: data.order,
    });

    return emoji;
  }

  async save(emoji: EmojiType): Promise<EmojiType> {
    const newEmojiType = await this.ormRepository.save(emoji);

    return newEmojiType;
  }

  async findById(id: string): Promise<EmojiType | undefined> {
    const emojiType = await this.ormRepository.findOne({
      relations: ['emojis'],
      where: { id_emoji: id },
    });

    return emojiType;
  }

  async findIndex(): Promise<EmojiType[]> {
    const emojiTypes = await this.ormRepository.find();

    return emojiTypes;
  }

  async findByCategory(category: string): Promise<EmojiType | undefined> {
    const emojiType = await this.ormRepository.findOne({
      where: { category: category.trim().toLowerCase() },
    });

    return emojiType;
  }

  async findLastInOrder(): Promise<EmojiType | undefined> {
    const emojiType = await this.ormRepository.findOne({
      order: { order: 'DESC' },
    });

    return emojiType;
  }

  async remove(entitie: EmojiType): Promise<void> {
    await this.ormRepository.softRemove(entitie);
  }

  async saveMany(entities: EmojiType[]): Promise<EmojiType[]> {
    const newTypes = await this.ormRepository.save(entities);

    return newTypes;
  }
}

export { EmojiTypeRepository };
