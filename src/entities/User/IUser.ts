export interface IUser {
  id: string;
  email: string;
  email_updated_at?: Date;
  username: string;
  password: string;
  name: string;
  name_updated_at?: Date;
  bio?: string;
  location?: string;
  gender?: string;
  friends_count?: number;
  emojis_count?: number;
  picture?: string;
  cover_photo?: string;
  private?: boolean;
  verified?: boolean;
  locale?: string;
  CNPJ?: string;
  role_name?: string;
  google_id?: string;
  tags: string[];
}
