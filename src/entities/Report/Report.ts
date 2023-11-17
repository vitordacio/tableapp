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
import { Event } from '@entities/Event/Event';

@Entity('reports')
class Report {
  @PrimaryColumn('uuid')
  id_report: string;

  @Column()
  message: string;

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

  @Column({ nullable: true })
  event_id: string;

  @ManyToOne(() => Event, event => event.reports)
  @JoinColumn({ name: 'event_id' })
  event: Event;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Exclude()
  @DeleteDateColumn()
  deleted_at: Date;
}

export { Report };
