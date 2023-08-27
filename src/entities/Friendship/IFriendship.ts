import { User } from '@entities/User/User';

export interface IFriendship {
  id: string;
  sender: User;
  receiver: User;
  accepted?: boolean;
}
