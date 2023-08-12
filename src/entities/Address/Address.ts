import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import { Exclude } from 'class-transformer';
import { Event } from '@entities/Event/Event';
import { User } from '@entities/User/User';

@Entity('addresses')
class Address {
  @PrimaryColumn('uuid')
  id_address: string;

  @Column()
  name: string;

  @Column()
  zip?: string;

  @Column()
  street?: string;

  @Column()
  uf?: string;

  @Column()
  city?: string;

  @Column()
  district?: string;

  @Column()
  number?: string;

  @Column({ precision: 10, scale: 6, type: 'numeric' })
  lat?: number;

  @Column({ precision: 10, scale: 6, type: 'numeric' })
  long?: number;

  @Column()
  user_id: string;

  @ManyToOne(() => User, user => user.addresses)
  @JoinColumn({ name: 'user_id' })
  user: User;

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

export { Address };
