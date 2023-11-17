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
import { User } from '@entities/User/User';
import { Notification } from '@entities/Notification/Notification';
import { EmojiType } from '@entities/EmojiType/EmojiType';
import { Event } from '@entities/Event/Event';

@Entity('emojis')
class Emoji {
  @PrimaryColumn('uuid')
  id_emoji: string;

  @Column()
  type_id: string;

  @ManyToOne(() => EmojiType, type => type.emojis)
  @JoinColumn({ name: 'type_id' })
  type: EmojiType;

  @Column()
  author_id: string;

  @ManyToOne(() => User, user => user.friendships_sent)
  @JoinColumn({ name: 'author_id' })
  author: User;

  @Column({ nullable: true })
  receiver_id: string;

  @ManyToOne(() => User, user => user.friendships_received)
  @JoinColumn({ name: 'receiver_id' })
  receiver: User;

  @Column({ nullable: true })
  event_id: string;

  @ManyToOne(() => Event, event => event.emojis)
  @JoinColumn({ name: 'event_id' })
  event: Event;

  @OneToMany(() => Notification, notification => notification.emoji)
  notifications: Notification[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Exclude()
  @DeleteDateColumn()
  deleted_at: Date;
}

export { Emoji };
