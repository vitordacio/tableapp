import { IEmoji } from '@entities/Emoji/IEmoji';
import { Emoji } from '@entities/Emoji/Emoji';

export interface IEmojiRepository {
  save(emoji: Emoji): Promise<Emoji>;
  create(data: IEmoji): Emoji;
  findById(id: string): Promise<Emoji | undefined>;
  findByValye(value: string): Promise<Emoji | undefined>;
  findByShorthand(shorthand: string): Promise<Emoji | undefined>;
  findLastInOrder(): Promise<Emoji | undefined>;
  remove(entitie: Emoji): Promise<void>;
  saveMany(entities: Emoji[]): Promise<Emoji[]>;
  findByCategoryMaster(category: string): Promise<Emoji[]>;
  findByCategory(
    category: string,
    page: number,
    limit: number,
  ): Promise<Emoji[]>;
}
