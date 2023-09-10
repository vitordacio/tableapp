export interface IFriendship {
  id: string;
  sender_id: string;
  receiver_id: string;
  reviwed_by_receiver?: boolean;
  accepted?: boolean;
}
