import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  JoinColumn,
} from 'typeorm';
import { User } from '@entities/User/User';

@Entity('user_updates')
class UserUpdate {
  @PrimaryColumn('uuid')
  id_user_update: string;

  @Column()
  type: string;

  @Column()
  from: string;

  @Column()
  to: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User, user => user.updates)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn()
  created_at: Date;
}

export { UserUpdate };
