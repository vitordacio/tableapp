export interface IReact {
  id: string;
  type: 'user' | 'event';
  message?: string;
  emoji_id: string;
  author_id: string;
  receiver_id?: string;
  event_id?: string;
}
