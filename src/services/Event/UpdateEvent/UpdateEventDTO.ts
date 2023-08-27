export interface IUpdateEventDTO {
  event_id: string;
  name: string;
  location: string;
  date: Date;
  time: Date;
  finish_date: Date;
  finish_time: Date;
  club_name?: string;
  performer?: string;
  additional?: string;
  drink_preferences?: string;
  age_limit?: number;
  free_ticket?: number;
  user: AuthorizedUser<UserPerm | PubPerm>;
}
