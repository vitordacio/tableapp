interface INotification {
  id: string;
  message: string;
  type: string;
  user_id: string;
  author_id?: string;
  friendship_id?: string;
  participation_id?: string;
  react_id?: string;
  achievement_id?: string;
  read?: boolean;
}

export { INotification };
