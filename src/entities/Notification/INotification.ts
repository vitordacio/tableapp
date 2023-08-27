interface INotification {
  id: string;
  message: string;
  type: string;
  user_id: string;
  sent_by?: string;
  friendship_id?: string;
  participation_id?: string;
  read?: boolean;
}

export { INotification };
