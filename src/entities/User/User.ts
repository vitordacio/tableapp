import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Participation } from '@entities/Participation/Participation';
import { Address } from '@entities/Address/Address';
import { Meeting } from '@entities/Meeting/Meeting';

@Entity('users')
class User {
  @PrimaryColumn('uuid')
  id_user: string;

  @Column({ nullable: false })
  email: string;

  @Column({ unique: true, nullable: false })
  username: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ default: 'user' })
  role_name: string;

  @Column({ nullable: true })
  address_id: string;

  // @OneToOne(() => Address, address => address.user, {
  //   cascade: ['insert', 'recover', 'remove', 'update'],
  //   eager: true,
  //   nullable: true,
  // })
  // @JoinColumn({ name: 'address_id' })
  // address: Address;
  @OneToMany(() => Address, address => address.user)
  addresses: Address[];

  @OneToOne(() => Meeting, meeting => meeting.owner, {
    cascade: true,
    nullable: true,
  })
  meeting: Meeting;

  @OneToMany(() => Participation, participation => participation.user)
  participations: Participation[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Exclude()
  @DeleteDateColumn()
  deleted_at: Date;
}

export { User };
