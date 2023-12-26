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
import { Achievement } from '@entities/Achievement/Achievement';
import { Report } from '@entities/Report/Report';
import { EventType } from '@entities/EventType/EventType';
import { EventPicture } from '@entities/EventPicture/EventPicture';
import { React } from '@entities/React/React';

export type EventControl = {
  participation_id?: string;
  status?: 'awaiting' | 'ongoing' | 'finished';
  participation_status?:
    | 'author'
    | 'user_in'
    | 'user_out'
    | 'guest_in'
    | 'guest_out'
    | 'mod_in'
    | 'mod_out'
    | 'vip_in'
    | 'vip_out'
    | '';
  can_see_content?: boolean;
};

@Entity('events')
class Event {
  @PrimaryColumn('uuid')
  id_event: string;

  @Column()
  type_id: string;

  @ManyToOne(() => EventType, type => type.events)
  @JoinColumn({ name: 'type_id' })
  type: EventType;

  @Column()
  name: string;

  @Column()
  location: string;

  @Column()
  start_time: Date;

  @Column()
  finish_time: Date;

  @Column({ default: 0 })
  participating_count: number;

  @Column({ default: 0 })
  emojis_count: number;

  participation_id?: string;

  @Column({ nullable: true })
  additional: string;

  @Column({ nullable: true })
  drink_preferences: string;

  @Column({ nullable: true })
  min_amount: string;

  @Column({ default: 0 })
  tickets_free: number;

  @Column({ nullable: true })
  ticket_value: string;

  @Column({ nullable: true })
  club_name: string;

  @Column({ nullable: true })
  performer: string;

  @Column({ nullable: true })
  cover_photo: string;

  @Column({ default: false })
  private: boolean;

  @Column({ array: true })
  @Exclude()
  tags: string;

  @Column({ default: false })
  @Exclude()
  computed: boolean;

  @Column()
  author_id: string;

  @ManyToOne(() => User, user => user.events)
  @JoinColumn({ name: 'author_id' })
  author: User;

  @Column({ nullable: true })
  address_id: string;

  @ManyToOne(() => Address, address => address.events)
  @JoinColumn({ name: 'address_id' })
  address: Address;

  @OneToMany(() => Achievement, achievement => achievement.event, {
    cascade: true,
  })
  achievements: Achievement[];

  @OneToMany(() => EventPicture, picture => picture.event, {
    cascade: true,
  })
  pictures: EventPicture[];

  @OneToMany(() => Participation, participation => participation.event, {
    cascade: true,
  })
  participations: Participation[];

  @OneToMany(() => React, react => react.event, {
    cascade: true,
  })
  reacts: React[];

  @OneToMany(() => Report, report => report.event, {
    cascade: true,
  })
  reports: Report[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Exclude()
  @DeleteDateColumn()
  deleted_at: Date;

  control: EventControl;
}

export { Event };
