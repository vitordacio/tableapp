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
      page,
      limit,
    );

    const promise = friendships.map(async friendship => {
      const friend =
        friendship.sender.id_user === friend_id
          ? friendship.receiver
          : friendship.sender;

      const checkFriendship = await this.friendshipRepository.findByUserIds(
        user.id,
        friend.id_user,
      );

      friend.friendship = checkFriendship;

      return friend;
    });

    friends = await Promise.all(promise);

    return friends;
  }
}

export { FindFriendsService };
