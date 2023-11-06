export interface IFriendship {
  id: string;
  sender_id: string;
  receiver_id: string;
  confirmed?: boolean;
}
