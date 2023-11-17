import { inject, injectable } from 'tsyringe';

import { IFriendshipRepository } from '@repositories/FriendshipRepository/IFriendshipRepository';
import { User } from '@entities/User/User';
import { IFindFriendsServiceDTO } from './IFindFriendsServiceDTO';

@injectable()
class FindFriendsService {
  constructor(
    @inject('FriendshipRepository')
    private friendshipRepository: IFriendshipRepository,
  ) {}

  async execute({
    friend_id,
    user,
    name,
    page,
    limit,
  }: IFindFriendsServiceDTO): Promise<User[]> {
    const friends: User[] = [];
    const friend_ids: string[] = [];

    const friendships = await this.friendshipRepository.findFriends(
      friend_id,
      page || 1,
      limit || 20,
      name || '',
    );

    friendships.forEach(friendship => {
      const friend =
        friendship.author_id === friend_id
          ? friendship.receiver
          : friendship.author;

      if (friend.id_user === user.id) return;

      friend_ids.push(friend.id_user);

      friend.friendship_status = '';
      friends.push(friend);
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

    // const promise = friendships.map(async friendship => {
    //   const friend =
    //     friendship.author_id === friend_id
    //       ? friendship.receiver
    //       : friendship.author;

    //   const checkFriendship = await this.friendshipRepository.findByUserIds(
    //     user.id,
    //     friend.id_user,
    //   );

    //   if (!checkFriendship) {
    //     friend.friendship_status = '';
    //   } else if (checkFriendship.confirmed) {
    //     friend.friendship_status = 'friends';
    //   } else {
    //     friend.friendship_status =
    //       checkFriendship.author_id === user.id
    //         ? 'request_sent'
    //         : 'request_received';
    //   }

    //   return friend;
    // });

    // friends = await Promise.all(promise);

    return friends;
  }
}

export { FindFriendsService };
