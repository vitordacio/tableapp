import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne,
} from 'typeorm';

import { Exclude } from 'class-transformer';
import { Event } from '@entities/Event/Event';
import { User } from '@entities/User/User';

@Entity('addresses')
class Address {
  @PrimaryColumn('uuid')
  id_address: string;

  @Column({ nullable: true })
  zip: string;

  @Column({ nullable: true })
  street: string;

  @Column({ nullable: true })
  uf: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  district: string;

  @Column({ nullable: true })
  number: string;

  @Column({ nullable: true, precision: 10, scale: 6, type: 'numeric' })
  lat: number;

  @Column({ nullable: true, precision: 10, scale: 6, type: 'numeric' })
  long: number;

  // @OneToMany(() => Event, event => event.type)
  // events: Event[];

  @OneToOne(() => User, user => user.address, {
    orphanedRowAction: 'delete',
  })
  user: User;

  @OneToOne(() => Event, event => event.address, {
    orphanedRowAction: 'delete',
  })
  event: Event;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Exclude()
  @DeleteDateColumn()
  deleted_at: Date;
}

export { Address };
