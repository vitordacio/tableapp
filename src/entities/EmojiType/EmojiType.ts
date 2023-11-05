import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';

import { Exclude } from 'class-transformer';
import { Emoji } from '@entities/Emoji/Emoji';

@Entity('emoji_types')
class EmojiType {
  @PrimaryColumn('uuid')
  id_emoji_type: string;

  @Column({ unique: true })
  name: string;

  @Column()
  shorthand: string;

  @OneToMany(() => Emoji, emoji => emoji.type)
  emojis: Emoji[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Exclude()
  @DeleteDateColumn()
  deleted_at: Date;
}

export { EmojiType };
