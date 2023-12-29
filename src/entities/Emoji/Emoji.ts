import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import { Exclude } from 'class-transformer';
import { EmojiType } from '@entities/EmojiType/EmojiType';
import { React } from '@entities/React/React';

@Entity('emojis')
class Emoji {
  @PrimaryColumn('uuid')
  id_emoji: string;

  @Column()
  value: string;

  @Column({ unique: true })
  shorthand: string;

  @Exclude()
  @Column()
  order: number;

  @Column()
  type_id: string;

  @ManyToOne(() => EmojiType, type => type.emojis)
  @JoinColumn({ name: 'type_id' })
  type: EmojiType;

  @OneToMany(() => React, react => react.emoji)
  reacts: React[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Exclude()
  @DeleteDateColumn()
  deleted_at: Date;
}

export { Emoji };
