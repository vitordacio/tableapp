import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Participation } from '@entities/Participation/Participation';
import { Event } from '@entities/Event/Event';
import { Friendship } from '@entities/Friendship/Friendship';
import { Address } from '@entities/Address/Address';
import { Notification } from '@entities/Notification/Notification';

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
  phone: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ default: 'user' })
  role_name: string;

  @Column({ default: false })
  private: boolean;

  @Column({ nullable: true })
  CNPJ: string;

  @Column({ nullable: true })
  age: number;

  @Column({ nullable: true })
  gender: string;

  @Column({ nullable: true })
  google_id: string;

  @Column({ default: 0 })
  friends: number;

  @OneToMany(() => Friendship, friendship => friendship.sender)
  sentFriendRequests: Friendship[];

  @OneToMany(() => Friendship, friendship => friendship.receiver)
  receivedFriendRequests: Friendship[];

  // @ManyToMany(() => User, user => user.friends)
  // friends: User[];

  @OneToMany(() => Notification, notification => notification.user)
  notifications_received: Notification[];

  @OneToMany(() => Notification, notification => notification.sender)
  notifications_sent: Notification[];

  @OneToMany(() => Event, event => event.owner)
  events: Event[];

  @OneToMany(() => Participation, participation => participation.user)
  participations: Participation[];

  @OneToMany(() => Participation, participation => participation.reviwer)
  participation_reviews: Participation[];

  @Column({ nullable: true })
  address_id: string;

  @OneToOne(() => Address, address => address.user, {
    cascade: true,
  })
  @JoinColumn({ name: 'address_id' })
  address: Address;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Exclude()
  @DeleteDateColumn()
  deleted_at: Date;
}

export { User };
