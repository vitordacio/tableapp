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
    user_id,
    reqUser,
    name,
    page,
    limit,
  }: IFindFriendsServiceDTO): Promise<User[]> {
    const user_ids: string[] = [];
    const friends: User[] = [];

    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new AppError('Usuário não encontrado', 404);
    }

    const friendships = name
      ? await this.friendshipRepository.findFriendsByUserIdAndName(
          user_id,
          page || 1,
          limit || 20,
          name || '',
        )
      : await this.friendshipRepository.findLatestByUserId(
          user_id,
          page || 1,
          limit || 20,
        );

    friendships.forEach(friendship => {
      const friend =
        friendship.author.id_user === user_id
          ? friendship.receiver
          : friendship.author;

      friend.friendship_status = reqUser.id === user_id ? 'friends' : '';

      if (friend.id_user !== reqUser.id) user_ids.push(friend.id_user);
      friends.push(friend);
    });

    if (user_ids.length !== 0 && reqUser.id !== user_id) {
      const userFriendships = await this.friendshipRepository.checkFriends(
        reqUser.id,
        user_ids,
      );

      userFriendships.forEach(friendship => {
        const userFriend =
          friendship.author.id_user === reqUser.id
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
            friendship.author.id_user === reqUser.id
              ? 'request_sent'
              : 'request_received';
        }
      });
    }

    return friends;
  }
}

export { FindFriendsService };
