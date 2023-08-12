import { Address } from '@entities/Address/Address';
import { IEventType } from '@entities/EventType/IEventType';
import { User } from '@entities/User/User';

export interface IEvent {
  id: string;
  name: string;
  location: string;
  time: Date;
  additional?: string;
  club_name?: string;
  performer?: string;
  drink_preferences?: string;
  age_limit?: number;
  free_ticket?: number;
  private?: boolean;
  address?: Address;
  tpye: IEventType;
  owner: User;
}
