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

@Entity('friendships')
class Friendship {
  @PrimaryColumn('uuid')
  id_friendship: string;

  @Column()
  author_id: string;

  @ManyToOne(() => User, user => user.friendships_sent)
  @JoinColumn({ name: 'author_id' })
  author: User;

  @Column()
  receiver_id: string;

  @ManyToOne(() => User, user => user.friendships_received)
  @JoinColumn({ name: 'receiver_id' })
  receiver: User;

  @Column({ default: false })
  confirmed: boolean;

  @OneToMany(() => Notification, notification => notification.friendship, {
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

export { Friendship };
