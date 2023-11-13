import { inject, injectable } from 'tsyringe';

import { IFriendshipRepository } from '@repositories/FriendshipRepository/IFriendshipRepository';
import { User } from '@entities/User/User';

@injectable()
class FindFriendsService {
  constructor(
    @inject('FriendshipRepository')
    private friendshipRepository: IFriendshipRepository,
  ) {}

  async execute(
    friend_id: string,
    user: AuthorizedUser<UserPerm | PubPerm>,
    page?: number,
    limit?: number,
  ): Promise<User[]> {
    let friends: User[] = [];
    const friendships = await this.friendshipRepository.findFriends(
      friend_id,
      page || 1,
      limit || 20,
    );

    const promise = friendships.map(async friendship => {
      const friend =
        friendship.sender_id === friend_id
          ? friendship.receiver
          : friendship.sender;

      const checkFriendship = await this.friendshipRepository.findByUserIds(
        user.id,
        friend.id_user,
      );

      if (!checkFriendship) {
        friend.friendship_status = '';
      } else if (checkFriendship.confirmed) {
        friend.friendship_status = 'friends';
      } else {
        friend.friendship_status =
          checkFriendship.sender_id === user.id
            ? 'request_sent'
            : 'request_received';
      }

      return friend;
    });

    friends = await Promise.all(promise);

    return friends;
  }
}

export { FindFriendsService };
