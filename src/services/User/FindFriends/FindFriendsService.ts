import { inject, injectable } from 'tsyringe';

import { IFriendshipRepository } from '@repositories/FriendshipRepository/IFriendshipRepository';
import { User } from '@entities/User/User';
import { IUserRepository } from '@repositories/UserRepository/IUserRepository';
import { AppError } from '@utils/AppError';
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
    const friends: User[] = [];

    const searchedUser = await this.userRepository.findById(friend_id);

    if (!searchedUser) {
      throw new AppError('Usuário não encontrado', 404);
    }

    const friendships = name
      ? await this.friendshipRepository.findFriendsByUserId(
          friend_id,
          page || 1,
          limit || 20,
          name || '',
        )
      : await this.friendshipRepository.findLatestByUserId(
          friend_id,
          page || 1,
          limit || 20,
        );

    friendships.forEach(friendship => {
      const friend =
        friendship.author.id_user === friend_id
          ? friendship.receiver
          : friendship.author;

      if (friend.id_user === user.id) return;

      friend.friendship_status = user.id === friend_id ? 'friends' : '';

      friend_ids.push(friend.id_user);
      friends.push(friend);
    });

    if (friend_ids.length !== 0 && user.id !== friend_id) {
      const userFriendships = await this.friendshipRepository.checkFriends(
        user.id,
        friend_ids,
      );

      userFriendships.forEach(friendship => {
        const userFriend =
          friendship.author.id_user === user.id
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
            friendship.author.id_user === user.id
              ? 'request_sent'
              : 'request_received';
        }
      });
    }

    return friends;
  }
}

export { FindFriendsService };
