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
import { Moment } from '@entities/Moment/Moment';
import { React } from '@entities/React/React';
import { Performer } from '@entities/Performer/Performer';

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
  reacts_count: number;

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

  @OneToMany(() => Moment, moment => moment.event, {
    cascade: true,
  })
  moments: Moment[];

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

  @OneToMany(() => Performer, performer => performer.event)
  performers: Performer[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Exclude()
  @DeleteDateColumn()
  deleted_at: Date;

  event_status: 'awaiting' | 'ongoing' | 'finished';

  participation_id: string | '';

  participation_status:
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

  participating: boolean;

  can_see_content: boolean;

  user_react: React | undefined;
}

export { Event };
