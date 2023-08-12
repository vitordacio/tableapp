import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  CreateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { User } from '@entities/User/User';
import { ParticipationType } from '@entities/ParticipationType/ParticipationType';
import { Event } from '@entities/Event/Event';

@Entity('participations')
class Participation {
  @PrimaryColumn('uuid')
  id_participation: string;

  @Column({ default: true })
  confirmed: boolean;

  @Column()
  user_id: string;

  @ManyToOne(() => User, user => user.participations)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  event_id: string;

  @ManyToOne(() => Event, event => event.participations)
  @JoinColumn({ name: 'event_id' })
  event: Event;

  @Column()
  allowed_by?: string;

  @ManyToOne(() => User, user => user.participation_allows)
  @JoinColumn({ name: 'allowed_by' })
  allower: User;

  @Column()
  type_id: string;

  @ManyToOne(() => ParticipationType, type => type.participations)
  @JoinColumn({ name: 'type_id' })
  type: ParticipationType;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Exclude()
  @DeleteDateColumn()
  deleted_at: Date;
}

export { Participation };
