// import { Address } from '@entities/Address/Address';
// import { Permission } from '@entities/Permission/Permission';

export interface IUser {
  id: string;
  email: string;
  username: string;
  password: string;
  name: string;
  phone?: string;
  avatar?: string;
  role_name?: string;
  age?: number;
  gender?: string;
  google_id?: string;
  private?: boolean;
}
