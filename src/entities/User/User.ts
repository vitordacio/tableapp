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
import { Event } from '@entities/Event/Event';
import { Friendship } from '@entities/Friendship/Friendship';
import { Address } from '@entities/Address/Address';
import { Notification } from '@entities/Notification/Notification';
import { SocialNetwork } from '@entities/SocialNetwork/SocialNetwork';
import { Achievement } from '@entities/Achievement/Achievement';
import { Report } from '@entities/Report/Report';
import { Moment } from '@entities/Moment/Moment';
import { Block } from '@entities/Block/Block';
import { Suggestion } from '@entities/Suggestion/Suggestion';
import { React } from '@entities/React/React';
import { UserUpdate } from '@entities/UserUpdate/UserUpdate';
import { Performer } from '@entities/Performer/Performer';

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
  name: string;

  @Column({ nullable: true })
  bio: string;

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: true })
  gender: string;

  @Column({ nullable: true })
  picture: string;

  @Column({ nullable: true })
  cover_photo: string;

  @Column({ default: true })
  actived: boolean;

  @Column({ default: false })
  private: boolean;

  @Column({ default: false })
  verified: boolean;

  @Column({ nullable: true })
  locale: string;

  @Column({ nullable: true })
  CNPJ: string;

  @Column({ default: 'user' })
  role_name: string;

  @Column({ nullable: true })
  google_id: string;

  @Column({ array: true })
  @Exclude()
  tags: string;

  // RELATIONS

  @OneToMany(() => Notification, notification => notification.user)
  notifications_received: Notification[];

  @OneToMany(() => Notification, notification => notification.author)
  notifications_sent: Notification[];

  @OneToMany(() => Event, event => event.author, { cascade: false })
  events: Event[];

  @OneToMany(() => Achievement, achievement => achievement.user, {
    cascade: false,
  })
  achievements: Achievement[];

  @OneToMany(() => Address, address => address.user, { cascade: false })
  addresses: Address[];

  @OneToMany(() => SocialNetwork, social_network => social_network.user, {
    cascade: false,
  })
  social_networks: SocialNetwork[];

  @OneToMany(() => Participation, participation => participation.user)
  participations: Participation[];

  @OneToMany(() => Suggestion, suggestion => suggestion.user)
  suggestions: Suggestion[];

  @OneToMany(() => Participation, participation => participation.reviwer)
  participation_reviews: Participation[];

  @Column({ default: 0 })
  friends_count: number;

  @OneToMany(() => Friendship, friendship => friendship.author)
  friendships_sent: Friendship[];

  @OneToMany(() => Friendship, friendship => friendship.receiver)
  friendships_received: Friendship[];

  @Column({ default: 0 })
  reacts_count: number;

  @OneToMany(() => React, react => react.author)
  reacts_sent: React[];

  @OneToMany(() => Moment, moment => moment.author, {
    cascade: true,
  })
  moments: Moment[];

  @OneToMany(() => React, react => react.receiver)
  reacts_received: React[];

  @OneToMany(() => Report, report => report.author)
  reports_sent: Report[];

  @OneToMany(() => Report, report => report.receiver)
  reports_received: Report[];

  @OneToMany(() => Block, block => block.author)
  blocks_sent: Block[];

  @OneToMany(() => Block, block => block.receiver)
  blocks_received: Block[];

  @OneToMany(() => UserUpdate, userUpdate => userUpdate.user)
  updates: UserUpdate[];

  @OneToMany(() => Performer, performer => performer.user)
  performers: Performer[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Exclude()
  @DeleteDateColumn()
  deleted_at: Date;

  friendship_id: string | '';

  friendship_status: 'friends' | 'request_sent' | 'request_received' | '';

  can_see_content: boolean;

  user_react: React | undefined;

  blocked: boolean;
}

export { User };
