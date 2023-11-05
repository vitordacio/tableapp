import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Exclude } from 'class-transformer';
import { User } from '@entities/User/User';
import { Event } from '@entities/Event/Event';
import { AchievementType } from '@entities/AchievementType/AchievementType';

@Entity('achievements')
class Achievement {
  @PrimaryColumn('uuid')
  id_achievement: string;

  @Column()
  type_id: string;

  @ManyToOne(() => AchievementType, type => type.achievements)
  @JoinColumn({ name: 'type_id' })
  type: AchievementType;

  @Column({ nullable: true })
  user_id: string;

  @ManyToOne(() => User, user => user.achievements)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ nullable: true })
  event_id: string;

  @ManyToOne(() => Event, event => event.achievements)
  @JoinColumn({ name: 'event_id' })
  event: Event;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Exclude()
  @DeleteDateColumn()
  deleted_at: Date;
}

export { Achievement };
