import { User } from '@entities/User/User';

export interface ILoginResponse {
  user: User;
  accessToken: string;
}

export interface ILoginDTO {
  login: string;
  password: string;
}

export interface IGoogleDTO {
  sub: string;
  email: string;
  name: string;
  picture: string;
  locale: string;
  iss: string;
  azp: string;
  aud: string;
  email_verified: boolean;
  nbf: number;
  given_name: string;
  family_name: string;
  iat: number;
  exp: number;
  jti: string;
}
