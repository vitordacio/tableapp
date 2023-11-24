import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';

import { Exclude } from 'class-transformer';
import { Event } from '@entities/Event/Event';

@Entity('event_types')
class EventType {
  @PrimaryColumn('uuid')
  id_event_type: string;

  @Column({ unique: true })
  name: string;

  @Column({ default: true })
  free_access: boolean;

  @Column({ default: 0 })
  count: number;

  @OneToMany(() => Event, event => event.type)
  events: Event[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Exclude()
  @DeleteDateColumn()
  deleted_at: Date;
}

export { EventType };
