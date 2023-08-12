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
import { EventType } from '@entities/EventType/EventType';

@Entity('events')
class Event {
  @PrimaryColumn('uuid')
  id_event: string;

  @Column()
  name: string;

  @Column()
  location: string;

  @Column()
  time: Date;

  @Column()
  additional?: string;

  @Column()
  club_name?: string;

  @Column()
  performer?: string;

  @Column()
  drink_preferences?: string;

  @Column()
  age_limit?: number;

  @Column({ default: 0 })
  free_ticket: number;

  @Column({ default: false })
  private: boolean;

  @Column()
  owner_id: string;

  @ManyToOne(() => User, user => user.events)
  @JoinColumn({ name: 'owner_id' })
  owner: User;

  @Column()
  type_id: string;

  @ManyToOne(() => EventType, type => type.events)
  @JoinColumn({ name: 'type_id' })
  type: EventType;

  @Column({ nullable: true })
  address_id: string;

  @ManyToOne(() => Address, address => address.events)
  @JoinColumn({ name: 'address_id' })
  address: Address;

  @OneToMany(() => Participation, participation => participation.event, {
    cascade: true,
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
