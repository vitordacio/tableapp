// import { Address } from '@entities/Address/Address';
// import { Permission } from '@entities/Permission/Permission';

export interface IUser {
  id: string;
  email: string;
  username: string;
  password: string;
  // name?: string;
  // phone?: string;
  // avatar?: string;
  // role: string;
  // role: 'master' | 'user' | 'pub';
  // name: string;
  // surname?: string;
  // phone?: string;
  // permissions?: Permission[];
  // password?: string;
  // avatar?: string;
  // address?: Address;
  // document: string;
  // is_locator?: boolean;
}
