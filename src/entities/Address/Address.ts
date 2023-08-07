import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
  OneToOne,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Exclude } from 'class-transformer';
import { Meeting } from '@entities/Meeting/Meeting';
import { User } from '@entities/User/User';

@Entity('addresses')
class Address {
  @PrimaryColumn('uuid')
  id_address: string;

  @Column()
  description: string;

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

  // @OneToOne(() => User, user => user.address, {
  //   orphanedRowAction: 'delete',
  // })
  // user: User;

  @Column({ nullable: false })
  user_id: string;

  @ManyToOne(() => User, user => user.addresses)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToOne(() => Meeting, meeting => meeting.address, {
    orphanedRowAction: 'delete',
  })
  meeting: Meeting;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Exclude()
  @DeleteDateColumn()
  deleted_at: Date;
}

export { Address };
