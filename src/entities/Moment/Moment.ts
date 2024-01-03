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

@Entity('moments')
class Moment {
  @PrimaryColumn('uuid')
  id_moment: string;

  @Column()
  thumb_url: string;

  @Column()
  img_url: string;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  event_id: string;

  @ManyToOne(() => Event, event => event.moments)
  @JoinColumn({ name: 'event_id' })
  event: Event;

  @Column()
  author_id: string;

  @ManyToOne(() => User, user => user.moments)
  @JoinColumn({ name: 'author_id' })
  author: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Exclude()
  @DeleteDateColumn()
  deleted_at: Date;
}

export { Moment };
