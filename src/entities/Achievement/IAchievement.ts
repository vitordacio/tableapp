export interface IAchievement {
  id: string;
  author_id: string;
  receiver_id: string;
  reviwed_by_receiver?: boolean;
  accepted?: boolean;
}
