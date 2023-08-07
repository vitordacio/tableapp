import { User } from '@entities/User/User';

export interface ILoginResponse {
  user: User;
  accessToken: string;
}

export interface ILoginDTO {
  login: string;
  password: string;
}
