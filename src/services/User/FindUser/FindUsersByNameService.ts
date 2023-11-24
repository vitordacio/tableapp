import { inject, injectable } from 'tsyringe';

import { User } from '@entities/User/User';
import { IUserRepository } from '@repositories/UserRepository/IUserRepository';
import { IFriendshipRepository } from '@repositories/FriendshipRepository/IFriendshipRepository';
import { IFindUsersServiceDTO } from './IFindUsersServiceDTO';

@injectable()
class FindUserByNameService {
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

    // const users = name
    //   ? await this.userRepository.findByName(
    //     name || '',
    //       page || 1,
    //       limit || 20,
    //     )
    //   : await this.userRepository.findLatest(
    //       page || 1,
    //       limit || 20,
    //     );

    users = await this.userRepository.findByName(
      name || '',
      page || 1,
      limit || 20,
    );

    const handler: User[] = [];
    users.forEach(searched => {
      if (user.id === searched.id_user) return;

      searched.friendship_status = '';

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

    return users;
  }
}

export { FindUserByNameService };
