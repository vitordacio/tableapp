import { inject, injectable } from 'tsyringe';

import { IFriendshipRepository } from '@repositories/FriendshipRepository/IFriendshipRepository';
import { User } from '@entities/User/User';
import { IUserRepository } from '@repositories/UserRepository/IUserRepository';
import { IFindFriendsServiceDTO } from './IFindFriendsServiceDTO';

@injectable()
class FindFriendsService {
  constructor(
    @inject('FriendshipRepository')
    private friendshipRepository: IFriendshipRepository,

    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute({
    friend_id,
    user,
    name,
    page,
    limit,
  }: IFindFriendsServiceDTO): Promise<User[]> {
    const friend_ids: string[] = [];

    const friends = await this.userRepository.findFriendsByUserId(
      friend_id,
      page || 1,
      limit || 20,
      name || '',
    );

    friends.forEach(friend => {
      if (friend.id_user === user.id) return;

      friend_ids.push(friend.id_user);
      friend.friendship_status = '';
    });

    if (friend_ids.length !== 0) {
      const userFriendships = await this.friendshipRepository.checkFriends(
        user.id,
        friend_ids,
      );

      userFriendships.forEach(friendship => {
        const userFriend =
          friendship.author_id === user.id
            ? friendship.receiver
            : friendship.author;

        const friend = friends.find(
          searchedFriend => searchedFriend.id_user === userFriend.id_user,
        );

        if (!friend) return;

        if (friendship.confirmed) {
          friend.friendship_status = 'friends';
        } else {
          friend.friendship_status =
            friendship.author_id === user.id
              ? 'request_sent'
              : 'request_received';
        }
      });
    }

    return friends;
  }
}

export { FindFriendsService };
