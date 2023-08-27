import { Event } from '@entities/Event/Event';
import { User } from '@entities/User/User';

export interface IAddress {
  id: string;
  zip?: string;
  street?: string;
  uf?: string;
  city?: string;
  district?: string;
  number?: string;
  lat?: number;
  long?: number;
  user?: User;
  event?: Event;
}
