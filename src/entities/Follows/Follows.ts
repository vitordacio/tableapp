import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Exclude } from 'class-transformer';
import { User } from '@entities/User/User';

@Entity('follows')
class Follow {
  @PrimaryColumn('uuid')
  id_address: string;

  @Column()
  follower_id?: string;

  @ManyToOne(() => User, user => user.followers)
  @JoinColumn({ name: 'follower_id' })
  follower: User;

  @Column()
  followed_id?: string;

  @ManyToOne(() => User, user => user.following)
  @JoinColumn({ name: 'followed_id' })
  following: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Exclude()
  @DeleteDateColumn()
  deleted_at: Date;
}

export { Follow };
