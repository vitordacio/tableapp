export interface IEvent {
  id: string;
  author_id: string;
  type_id: string;
  address_id?: string;
  name: string;
  location: string;
  start_time?: Date;
  finish_time?: Date;
  private?: boolean;
  additional?: string;
  drink_preferences?: string;
  min_amount?: string;
  tickets_free?: number;
  ticket_value?: string;
  club_name?: string;
  tags: string[];
  participating_count?: number;
  reacts_count?: number;
}
