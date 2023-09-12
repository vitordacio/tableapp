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
  sender_id: string;

  @ManyToOne(() => User, user => user.sentFriendRequests)
  @JoinColumn({ name: 'sender_id' })
  sender: User;

  @Column()
  receiver_id: string;

  @ManyToOne(() => User, user => user.receivedFriendRequests)
  @JoinColumn({ name: 'receiver_id' })
  receiver: User;

  @Column({ default: false })
  reviwed_by_receiver: boolean;

  @Column({ default: false })
  accepted: boolean;

  @OneToMany(() => Notification, notification => notification.friendship)
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
