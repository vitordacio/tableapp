export interface ICreateEventDTO {
  type: string;
  name: string;
  location: string;
  date?: string;
  time?: string;
  finish_date?: string;
  finish_time?: string;
  club_name?: string;
  performer?: string;
  additional?: string;
  drink_preferences?: string;
  age_limit?: number;
  free_ticket?: number;
  is_private?: boolean;
  user: AuthorizedUser<UserPerm | PubPerm>;
}
