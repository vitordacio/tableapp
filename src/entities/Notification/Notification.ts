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
  sent_by: string;

  @ManyToOne(() => User, user => user.notifications_sent)
  @JoinColumn({ name: 'sent_by' })
  sender: User;

  @Column({ nullable: true })
  friendship_id: string;

  @ManyToOne(() => Friendship, friendship => friendship.notifications)
  @JoinColumn({ name: 'friendship_id' })
  friendship: Friendship;

  @Column({ nullable: true })
  participation_id: string;

  @ManyToOne(() => Participation, participation => participation.notifications)
  @JoinColumn({ name: 'participation_id' })
  participation: Participation;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Exclude()
  @DeleteDateColumn()
  deleted_at: Date;
}

export { Notification };
