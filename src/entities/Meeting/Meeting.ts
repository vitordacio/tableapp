import {
  Column,
  CreateDateColumn,
  Entity,
  UpdateDateColumn,
  PrimaryColumn,
  DeleteDateColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { User } from '@entities/User/User';
import { Participation } from '@entities/Participation/Participation';
import { Address } from '@entities/Address/Address';
import { MeetingType } from '@entities/MeetingType/MeetingType';

@Entity('meetings')
class Meeting {
  @PrimaryColumn('uuid')
  id_meeting: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: false })
  location: string;

  @Column({ nullable: false })
  owner_id: string;

  @OneToOne(() => User, user => user.meeting, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'owner_id' })
  owner: User;

  @Column({ nullable: false })
  type_id: string;

  @ManyToOne(() => MeetingType, type => type.meetings)
  @JoinColumn({ name: 'type_id' })
  type: MeetingType;

  @Column({ nullable: true })
  address_id: string;

  @OneToOne(() => Address, address => address.meeting, {
    cascade: ['insert', 'recover', 'remove', 'update'],
    eager: true,
    nullable: true,
  })
  @JoinColumn({ name: 'address_id' })
  address: Address;

  @OneToMany(() => Participation, participation => participation.meeting)
  participations: Participation[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Exclude()
  @DeleteDateColumn()
  deleted_at: Date;
}

export { Meeting };
