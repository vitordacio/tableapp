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

@Entity('performers')
class Performer {
  @PrimaryColumn('uuid')
  id_performer: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  user_id: string;

  @ManyToOne(() => User, user => user.performers)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  event_id: string;

  @ManyToOne(() => Event, event => event.performers)
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

export { Performer };
