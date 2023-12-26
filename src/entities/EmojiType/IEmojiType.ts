import { Emoji } from '@entities/Emoji/Emoji';

export interface IEmojiType {
  id: string;
  category: string;
  order: number;
  emojis?: Emoji[];
}
