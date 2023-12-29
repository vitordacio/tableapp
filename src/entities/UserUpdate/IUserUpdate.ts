import { IUser } from '@entities/User/IUser';

export interface IUserUpdate {
  id: string;
  type: 'email' | 'name' | 'username' | 'password';
  from: string;
  to: string;
  user_id: string;
  user?: IUser;
}
