import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Participation } from '@entities/Participation/Participation';
import { Address } from '@entities/Address/Address';
import { Event } from '@entities/Event/Event';
import { Follow } from '@entities/Follows/Follows';

@Entity('users')
class User {
  @PrimaryColumn('uuid')
  id_user: string;

  @Column()
  email: string;

  @Column({ unique: true })
  username: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  name?: string;

  @Column()
  phone?: string;

  @Column()
  avatar?: string;

  @Column({ default: 'user' })
  role_name: string;

  @Column()
  address_id?: string;

  @OneToMany(() => Address, address => address.user)
  addresses: Address[];

  @OneToMany(() => Event, event => event.owner)
  events: Event[];

  @OneToMany(() => Participation, participation => participation.user)
  participations: Participation[];

  @OneToMany(() => Participation, participation => participation.allower)
  participation_allows: Participation[];

  @OneToMany(() => Follow, follow => follow.follower)
  followers: Follow[];

  @OneToMany(() => Follow, follow => follow.following)
  following: Follow[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Exclude()
  @DeleteDateColumn()
  deleted_at: Date;
}

export { User };
