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
import { SocialNetwork } from '@entities/SocialNetwork/SocialNetwork';

@Entity('social_network_types')
class SocialNetworkType {
  @PrimaryColumn('uuid')
  id_social_network_type: string;

  @Column({ unique: true })
  type: string;

  @Column()
  base_url: string;

  @OneToMany(() => SocialNetwork, social_network => social_network.type)
  social_networks: SocialNetwork[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Exclude()
  @DeleteDateColumn()
  deleted_at: Date;
}

export { SocialNetworkType };
