import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { User } from '@entities/User/User';
import { Event, EventControl } from '@entities/Event/Event';
import { ParticipationType } from '@entities/ParticipationType/ParticipationType';
import { Notification } from '@entities/Notification/Notification';

@Entity('participations')
class Participation {
  @PrimaryColumn('uuid')
  id_participation: string;

  @Column()
  type_id: string;

  @ManyToOne(() => ParticipationType, type => type.participations)
  @JoinColumn({ name: 'type_id' })
  type: ParticipationType;

  @Column({ default: false })
  in: boolean;

  @Column({ default: false })
  confirmed_by_user: boolean;

  @Column({ default: false })
  confirmed_by_event: boolean;

  @Column()
  user_id: string;

  @ManyToOne(() => User, user => user.participations)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ nullable: true })
  reviwer_id: string;

  @ManyToOne(() => User, user => user.participation_reviews)
  @JoinColumn({ name: 'reviwer_id' })
  reviwer: User;

  @Column()
  event_id: string;

  @ManyToOne(() => Event, event => event.participations)
  @JoinColumn({ name: 'event_id' })
  event: Event;

  @OneToMany(() => Notification, notification => notification.participation, {
    cascade: true,
  })
  notifications: Notification[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Exclude()
  @DeleteDateColumn()
  deleted_at: Date;

  control: EventControl;
}

export { Participation };
