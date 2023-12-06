export interface ICreateEventDTO {
  type_id: string;
  name: string;
  location: string;
  start_time?: Date;
  finish_time?: Date;
  is_private?: boolean;
  additional?: string;
  drink_preferences?: string;
  min_amount?: string;
  performer?: string;
  club_name?: string;
  ticket_value?: string;
  tickets_free?: number;
  address_id?: string;
  user: AuthorizedUser<UserPerm | PubPerm>;
}
