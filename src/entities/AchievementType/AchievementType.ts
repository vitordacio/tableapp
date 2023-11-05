import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';

import { Exclude } from 'class-transformer';
import { Achievement } from '@entities/Achievement/Achievement';

@Entity('achievement_types')
class AchievementType {
  @PrimaryColumn('uuid')
  id_achievement_type: string;

  @Column({ unique: true })
  name: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: 0 })
  difficulty: number;

  @OneToMany(() => Achievement, achievement => achievement.type)
  achievements: Achievement[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Exclude()
  @DeleteDateColumn()
  deleted_at: Date;
}

export { AchievementType };
