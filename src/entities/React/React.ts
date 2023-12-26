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
import { Emoji } from '@entities/Emoji/Emoji';
import { Event } from '@entities/Event/Event';

@Entity('reacts')
class React {
  @PrimaryColumn('uuid')
  id_react: string;

  @Column()
  type: string;

  @Column({ nullable: true })
  message: string;

  @Column()
  emoji_id: string;

  @ManyToOne(() => Emoji, emoji => emoji.reacts)
  @JoinColumn({ name: 'emoji_id' })
  emoji: Emoji;

  @Column()
  author_id: string;

  @ManyToOne(() => User, user => user.reacts_sent)
  @JoinColumn({ name: 'author_id' })
  author: User;

  @Column({ nullable: true })
  receiver_id: string;

  @ManyToOne(() => User, user => user.reacts_received)
  @JoinColumn({ name: 'receiver_id' })
  receiver: User;

  @Column({ nullable: true })
  event_id: string;

  @ManyToOne(() => Event, event => event.reacts)
  @JoinColumn({ name: 'event_id' })
  event: Event;

  @OneToMany(() => Notification, notification => notification.react, {
    cascade: true,
  })
  notifications: Notification[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Exclude()
  @DeleteDateColumn()
  deleted_at: Date;
}

export { React };
