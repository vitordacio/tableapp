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
import { Emoji } from '@entities/Emoji/Emoji';
import { Achievement } from '@entities/Achievement/Achievement';
import { Report } from '@entities/Report/Report';
import { EventType } from '@entities/EventType/EventType';
import { EventPicture } from '@entities/EventPicture/EventPicture';

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
  drink_preferences: string;

  @Column({ nullable: true })
  min_amount: number;

  @Column({ default: 0 })
  tickets_free: number;

  @Column({ nullable: true })
  ticket_value: number;

  @Column({ nullable: true })
  club_name: string;

  @Column({ nullable: true })
  performer: string;

  @Column({ nullable: true })
  cover_photo: string;

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

  @OneToMany(() => Achievement, achievement => achievement.event, {
    cascade: false,
  })
  achievements: Achievement[];

  @OneToMany(() => EventPicture, picture => picture.event, {
    cascade: false,
  })
  pictures: EventPicture[];

  @OneToMany(() => Participation, participation => participation.event, {
    cascade: ['insert', 'recover', 'remove', 'update'],
    eager: true,
  })
  participations: Participation[];

  @OneToMany(() => Emoji, emoji => emoji.event)
  emojis: Emoji[];

  @OneToMany(() => Report, report => report.event)
  reports: Report[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Exclude()
  @DeleteDateColumn()
  deleted_at: Date;
}

export { Event };
