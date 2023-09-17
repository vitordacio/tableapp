export interface IEvent {
  id: string;
  owner_id: string;
  address_id?: string;
  type: string;
  name: string;
  location: string;
  date: string;
  time: string;
  finish_date?: string;
  finish_time?: string;
  additional?: string;
  club_name?: string;
  performer?: string;
  drink_preferences?: string;
  age_limit?: number;
  free_ticket?: number;
  private?: boolean;
  img_url?: string;
}
