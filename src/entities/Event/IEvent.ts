export interface IEvent {
  id: string;
  author_id: string;
  type_id: string;
  address_id?: string;
  name: string;
  location: string;
  date: string;
  time: string;
  finish_date: string;
  finish_time: string;
  additional?: string;
  drink_preferences?: string;
  min_amount?: number;
  tickets_free?: number;
  ticket_value?: number;
  club_name?: string;
  performer?: string;
  cover_photo?: string;
  private?: boolean;
  tags: string[];
  participating_count?: number;
  emojis_count?: number;
}
