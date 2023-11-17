export interface ICreateEventDTO {
  type_id: string;
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
  ticket_value?: number;
  tickets_free?: number;
  min_amount?: number;
  is_private?: boolean;
  user: AuthorizedUser<UserPerm | PubPerm>;
}
