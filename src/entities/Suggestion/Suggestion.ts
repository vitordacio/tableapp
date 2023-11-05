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

@Entity('suggestions')
class Suggestion {
  @PrimaryColumn('uuid')
  id_suggestion: string;

  @Column()
  message: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User, user => user.suggestions)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Exclude()
  @DeleteDateColumn()
  deleted_at: Date;
}

export { Suggestion };
