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

@Entity('blocks')
class Block {
  @PrimaryColumn('uuid')
  id_block: string;

  @Column()
  author_id: string;

  @ManyToOne(() => User, user => user.reports_sent)
  @JoinColumn({ name: 'author_id' })
  author: User;

  @Column({ nullable: true })
  receiver_id: string;

  @ManyToOne(() => User, user => user.reports_received)
  @JoinColumn({ name: 'receiver_id' })
  receiver: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Exclude()
  @DeleteDateColumn()
  deleted_at: Date;
}

export { Block };
