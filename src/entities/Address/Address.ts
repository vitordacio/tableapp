import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Exclude } from 'class-transformer';
import { Event } from '@entities/Event/Event';
import { User } from '@entities/User/User';

@Entity('addresses')
class Address {
  @PrimaryColumn('uuid')
  id_address: string;

  @Column({ precision: 10, scale: 6, type: 'numeric' })
  lat: number;

  @Column({ precision: 10, scale: 6, type: 'numeric' })
  long: number;

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

  @Column({ nullable: true })
  user_id: string;

  @ManyToOne(() => User, user => user.addresses)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Event, event => event.address)
  events: Event[];

  // @OneToOne(() => User, user => user.address, {
  //   cascade: false,
  // })
  // user: User;

  // @OneToOne(() => Event, event => event.address, {
  //   orphanedRowAction: 'delete',
  // })
  // event: Event;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Exclude()
  @DeleteDateColumn()
  deleted_at: Date;
}

export { Address };
