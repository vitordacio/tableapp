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
import { Participation } from '@entities/Participation/Participation';

@Entity('participation_types')
class ParticipationType {
  @PrimaryColumn('uuid')
  id_participation_type: string;

  @Column({ nullable: false })
  type: string;

  @Column({ nullable: false })
  type_name: string;

  @OneToMany(() => Participation, participation => participation.type)
  participations: Participation[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Exclude()
  @DeleteDateColumn()
  deleted_at: Date;
}

export { ParticipationType };
