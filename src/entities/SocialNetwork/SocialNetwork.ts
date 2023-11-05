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
import { SocialNetworkType } from '@entities/SocialNetworkType/SocialNetworkType';

@Entity('social_networks')
class SocialNetwork {
  @PrimaryColumn('uuid')
  id_social_network: string;

  @Column()
  type_id: string;

  @ManyToOne(() => SocialNetworkType, type => type.social_networks)
  @JoinColumn({ name: 'type_id' })
  type: SocialNetworkType;

  @Column()
  user_id: string;

  @ManyToOne(() => User, user => user.social_networks)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Exclude()
  @DeleteDateColumn()
  deleted_at: Date;
}

export { SocialNetwork };
