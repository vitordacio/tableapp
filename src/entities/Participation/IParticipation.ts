export interface IParticipation {
  id: string;
  type_id: string;
  user_id: string;
  event_id: string;
  in?: boolean;
  confirmed_by_user?: boolean;
  confirmed_by_event?: boolean;
  reviwer_id?: string;
}
