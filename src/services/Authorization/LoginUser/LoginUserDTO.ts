import { User } from '@entities/User/User';

export interface ILoginUserResponse {
  user: User;
  accessToken: string;
}

export interface ILoginUserDTO {
  login: string;
  password: string;
}
