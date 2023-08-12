import { User } from '@entities/User/User';

export interface IAddress {
  id: string;
  name: string;
  zip?: string;
  street?: string;
  uf?: string;
  city?: string;
  district?: string;
  number?: string;
  lat?: number;
  long?: number;
  user: User;
}
