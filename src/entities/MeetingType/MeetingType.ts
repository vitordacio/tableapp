import {
  Entity,
  PrimaryColumn,
  Column,
  UpdateDateColumn,
  DeleteDateColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Meeting } from '@entities/Meeting/Meeting';

@Entity('meeting_types')
class MeetingType {
  @PrimaryColumn('uuid')
  id_meeting_type: string;

  @Column({ nullable: false })
  type: string;

  @Column({ nullable: false })
  type_name: string;

  @OneToMany(() => Meeting, meeting => meeting.type)
  meetings: Meeting[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Exclude()
  @DeleteDateColumn()
  deleted_at: Date;
}

export { MeetingType };
