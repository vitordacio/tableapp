import {
  Column,
  CreateDateColumn,
  Entity,
  UpdateDateColumn,
  PrimaryColumn,
  DeleteDateColumn,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { User } from '@entities/User/User';
import { Participation } from '@entities/Participation/Participation';
import { Address } from '@entities/Address/Address';

@Entity('events')
class Event {
  @PrimaryColumn('uuid')
  id_event: string;

  @Column()
  type: string;

  @Column()
  name: string;

  @Column()
  location: string;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'time' })
  time: Date;

  @Column({ type: 'date' })
  finish_date: Date;

  @Column({ type: 'time' })
  finish_time: Date;

  @Column({ default: true })
  actived: boolean;

  @Column({ nullable: true })
  additional: string;

  @Column({ nullable: true })
  club_name: string;

  @Column({ nullable: true })
  performer: string;

  @Column({ nullable: true })
  drink_preferences: string;

  @Column({ nullable: true })
  img_url: string;

  @Column({ default: 0 })
  age_limit: number;

  @Column({ default: 0 })
  free_ticket: number;

  @Column({ default: false })
  private: boolean;

  @Column()
  owner_id: string;

  @ManyToOne(() => User, user => user.events)
  @JoinColumn({ name: 'owner_id' })
  owner: User;

  @Column({ nullable: true })
  address_id: string;

  @ManyToOne(() => Address, address => address.events)
  @JoinColumn({ name: 'address_id' })
  address: Address;

  @OneToMany(() => Participation, participation => participation.event, {
    cascade: ['insert', 'recover', 'remove', 'update'],
    eager: true,
  })
  participations: Participation[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Exclude()
  @DeleteDateColumn()
  deleted_at: Date;
}

export { Event };
