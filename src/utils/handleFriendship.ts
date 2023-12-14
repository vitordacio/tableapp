import { User } from '@entities/User/User';
import { Friendship } from '@entities/Friendship/Friendship';

type checkFriendship = {
  user_id: string;
  friendship?: Friendship;
};

export const checkFriendship = ({
  user_id,
  friendship,
}: checkFriendship): User['friendship_status'] => {
  if (!friendship) return '';

  if (friendship.confirmed) return 'friends';

  return friendship.author_id === user_id ? 'request_sent' : 'request_received';
};
