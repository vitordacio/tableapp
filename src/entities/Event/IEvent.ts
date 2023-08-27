import { Address } from '@entities/Address/Address';
import { User } from '@entities/User/User';

export interface IEvent {
  id: string;
  type: string;
  name: string;
  location: string;
  date: string;
  time: string;
  finish_date?: string;
  finish_time?: string;
  img_url?: string;
  owner: User;
  address?: Address;
  additional?: string;
  club_name?: string;
  performer?: string;
  drink_preferences?: string;
  age_limit?: number;
  free_ticket?: number;
  private?: boolean;
}
