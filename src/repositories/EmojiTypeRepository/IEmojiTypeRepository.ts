import { IEmojiType } from '../../entities/EmojiType/IEmojiType';
import { EmojiType } from '../../entities/EmojiType/EmojiType';

export interface IEmojiTypeRepository {
  create(data: IEmojiType): EmojiType;
  save(event: EmojiType): Promise<EmojiType>;
  findById(id: string): Promise<EmojiType | undefined>;
  findIndex(): Promise<EmojiType[]>;
  findByCategory(category: string): Promise<EmojiType | undefined>;
  findLastInOrder(): Promise<EmojiType | undefined>;
  remove(entitie: EmojiType): Promise<void>;
  saveMany(entities: EmojiType[]): Promise<EmojiType[]>;
}
