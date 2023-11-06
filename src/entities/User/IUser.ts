export interface IUser {
  id: string;
  email: string;
  username: string;
  password: string;
  name: string;
  bio?: string;
  location?: string;
  gender?: string;
  friends_count: number;
  emojis_count: number;
  picture?: string;
  cover_photo?: string;
  private?: boolean;
  locale?: string;
  CNPJ?: string;
  role_name?: string;
  google_id?: string;
}
