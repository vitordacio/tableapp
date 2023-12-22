import { inject, injectable } from 'tsyringe';

import { User } from '@entities/User/User';
import { IUserRepository } from '@repositories/UserRepository/IUserRepository';
import { IFriendshipRepository } from '@repositories/FriendshipRepository/IFriendshipRepository';
import { checkCanSeeContent } from '@utils/handleUser';
import { IFindUsersServiceDTO } from './IFindUsersServiceDTO';

@injectable()
class FindUsersByNameService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('FriendshipRepository')
    private friendshipRepository: IFriendshipRepository,
  ) {}

  async execute({
    name,
    page,
    limit,
    user,
  }: IFindUsersServiceDTO): Promise<User[]> {
    const friend_ids: string[] = [];
    let users: User[] = [];

    users = await this.userRepository.findByName(
      name || '',
      page || 1,
      limit || 20,
    );

    const handler: User[] = [];
    users.forEach(searched => {
      if (user.id === searched.id_user) return;

      searched.control = {
        friendship_id: '',
        friendship_status: '',
        can_see_content: false,
      };

      friend_ids.push(searched.id_user);
      handler.push(searched);
    });

    users = handler;

    if (friend_ids.length !== 0) {
      const userFriendships = await this.friendshipRepository.checkFriends(
        user.id,
        friend_ids,
      );

      userFriendships.forEach(friendship => {
        const userFriend =
          friendship.author.id_user === user.id
            ? friendship.receiver
            : friendship.author;

        const friend = users.find(
          searchedFriend => searchedFriend.id_user === userFriend.id_user,
        );

        if (!friend) return;

        friend.control.friendship_id = friendship.id_friendship;

        if (friendship.confirmed) {
          friend.control.friendship_status = 'friends';
        } else {
          friend.control.friendship_status =
            friendship.author.id_user === user.id
              ? 'request_sent'
              : 'request_received';
        }

        friend.control.can_see_content = checkCanSeeContent({
          requester_id: user.id,
          user: friend,
        });
      });
    }

    return users;
  }
}

export { FindUsersByNameService };
