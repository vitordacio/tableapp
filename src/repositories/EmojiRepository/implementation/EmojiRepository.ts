import { getRepository, Repository } from 'typeorm';
import { IEmoji } from '@entities/Emoji/IEmoji';
import { Emoji } from '@entities/Emoji/Emoji';
import { IEmojiRepository } from '../IEmojiRepository';

class EmojiRepository implements IEmojiRepository {
  private ormRepository: Repository<Emoji>;

  constructor() {
    this.ormRepository = getRepository(Emoji);
  }

  create(data: IEmoji): Emoji {
    const emoji = this.ormRepository.create({
      id_emoji: data.id,
      value: data.value,
      shorthand: data.shorthand,
      order: data.order,
      type_id: data.type_id,
    });

    return emoji;
  }

  async save(emoji: Emoji): Promise<Emoji> {
    const newEmoji = await this.ormRepository.save(emoji);

    return newEmoji;
  }

  async findById(id: string): Promise<Emoji | undefined> {
    const emoji = await this.ormRepository.findOne({
      relations: ['type'],
      where: { id_emoji: id },
    });

    return emoji;
  }

  async findByValye(value: string): Promise<Emoji | undefined> {
    const emoji = await this.ormRepository.findOne({
      where: { value },
    });

    return emoji;
  }

  async findByShorthand(shorthand: string): Promise<Emoji | undefined> {
    const emoji = await this.ormRepository.findOne({
      where: { shorthand },
    });

    return emoji;
  }

  async findByCategoryMaster(category: string): Promise<Emoji[]> {
    const emoji = await this.ormRepository.find({
      relations: ['type'],
      where: { type: { category } },
    });

    return emoji;
  }

  async findByCategory(
    category: string,
    page: number,
    limit: number,
  ): Promise<Emoji[]> {
    const emojis = this.ormRepository
      .createQueryBuilder('emoji')
      .leftJoin('emoji.type', 'type')
      .where('type.category = :category', { category })
      .orderBy('emoji.order', 'ASC')
      .take(limit)
      .skip(page && limit ? limit * (page - 1) : undefined)
      .getMany();

    return emojis;
  }

  async findLastInOrder(): Promise<Emoji | undefined> {
    const emoji = await this.ormRepository.findOne({
      order: { order: 'DESC' },
    });

    return emoji;
  }

  async remove(entitie: Emoji): Promise<void> {
    await this.ormRepository.softRemove(entitie);
  }

  async saveMany(entities: Emoji[]): Promise<Emoji[]> {
    const emojis = await this.ormRepository.save(entities);

    return emojis;
  }
}

export { EmojiRepository };
