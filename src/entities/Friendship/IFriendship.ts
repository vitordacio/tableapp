export interface IFriendship {
  id: string;
  author_id: string;
  receiver_id: string;
  confirmed?: boolean;
}
