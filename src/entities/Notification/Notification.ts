import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '@entities/User/User';
import { Participation } from '@entities/Participation/Participation';
import { Friendship } from '@entities/Friendship/Friendship';
import { Emoji } from '@entities/Emoji/Emoji';
import { Achievement } from '@entities/Achievement/Achievement';

@Entity('notifications')
class Notification {
  @PrimaryColumn('uuid')
  id_notification: string;

  @Column()
  message: string;

  @Column({ default: false })
  read: boolean;

  @Column()
  type: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User, user => user.notifications_received)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  author_id: string;

  @ManyToOne(() => User, user => user.notifications_sent)
  @JoinColumn({ name: 'author_id' })
  author: User;

  @Column({ nullable: true })
  friendship_id: string;

  @ManyToOne(() => Friendship, friendship => friendship.notifications)
  @JoinColumn({ name: 'friendship_id' })
  friendship: Friendship;

  @Column({ nullable: true })
  emoji_id: string;

  @ManyToOne(() => Emoji, emoji => emoji.notifications)
  @JoinColumn({ name: 'emoji_id' })
  emoji: Emoji;

  @Column({ nullable: true })
  participation_id: string;

  @ManyToOne(() => Participation, participation => participation.notifications)
  @JoinColumn({ name: 'participation_id' })
  participation: Participation;

  @Column({ nullable: true })
  achievement_id: string;

  @ManyToOne(() => Achievement, achievement => achievement.notifications)
  @JoinColumn({ name: 'achievement_id' })
  achievement: Achievement;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Exclude()
  @DeleteDateColumn()
  deleted_at: Date;
}

export { Notification };
