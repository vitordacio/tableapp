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
  sender_id: string;

  @ManyToOne(() => User, user => user.reports_sent)
  @JoinColumn({ name: 'sender_id' })
  sender: User;

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
