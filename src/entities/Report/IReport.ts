export interface IReport {
  id: string;
  type: string;
  message: string;
  author_id: string;
  receiver_id?: string;
  event_id?: string;
}
