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
import { Meeting } from '@entities/Meeting/Meeting';

@Entity('participations')
class Participation {
  @PrimaryColumn('uuid')
  id_participation: string;

  @Column({ default: false })
  going: boolean;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: false })
  meeting_id: string;

  @ManyToOne(() => Meeting, meeting => meeting.participations)
  @JoinColumn({ name: 'meeting_id' })
  meeting: Meeting;

  @Column({ nullable: false })
  user_id: string;

  @ManyToOne(() => User, user => user.participations)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ nullable: false })
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
