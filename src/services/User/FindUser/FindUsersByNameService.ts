import { inject, injectable } from 'tsyringe';

import { User } from '@entities/User/User';
import { IUserRepository } from '@repositories/UserRepository/IUserRepository';
import { IFriendshipRepository } from '@repositories/FriendshipRepository/IFriendshipRepository';
import { AppError } from '@utils/AppError';
import { generateUserControl } from '@utils/handleControl';
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
    reqUser,
  }: IFindUsersServiceDTO): Promise<User[]> {
    const friend_ids: string[] = [];

    const [requester, users] = await Promise.all([
      this.userRepository.findById(reqUser.id),
      this.userRepository.findByName(name || '', page || 1, limit || 20),
    ]);

    if (!requester) {
      throw new AppError('Token expirado, realize login novamente.', 403);
    }

    // let users: User[] = [];

    // users = await this.userRepository.findByName(
    //   name || '',
    //   page || 1,
    //   limit || 20,
    // );

    const handler: User[] = [];
    users.forEach(searched => {
      if (reqUser.id === searched.id_user) return;

      // searched.control = {
      //   friendship_id: '',
      //   friendship_status: '',
      //   can_see_content: false,
      // };

      friend_ids.push(searched.id_user);
      handler.push(searched);
    });

    // users = handler;

    if (handler.length !== 0) {
      const userFriendships = await this.friendshipRepository.checkFriends(
        reqUser.id,
        friend_ids,
      );

      handler.forEach(searched => {
        const friendship = userFriendships.find(
          userFriendship =>
            userFriendship.author.id_user === searched.id_user ||
            userFriendship.receiver.id_user === searched.id_user,
        );

        searched.control = generateUserControl({
          friendship,
          requester,
          user: searched,
        });
      });

      // userFriendships.forEach(friendship => {
      //   const userFriend =
      //     friendship.author.id_user === reqUser.id
      //       ? friendship.receiver
      //       : friendship.author;

      //   const friend = handler.find(
      //     searchedFriend => searchedFriend.id_user === userFriend.id_user,
      //   );

      // if (!friend) return;

      // user.control = generateUserControl({
      //   friendship,
      //   requester,
      //   user,
      // });

      //   friend.control.friendship_id = friendship.id_friendship;

      //   if (friendship.confirmed) {
      //     friend.control.friendship_status = 'friends';
      //   } else {
      //     friend.control.friendship_status =
      //       friendship.author.id_user === user.id
      //         ? 'request_sent'
      //         : 'request_received';
      //   }

      //   friend.control.can_see_content = checkCanSeeUserContent({
      //     requester_id: user.id,
      //     user: friend,
      //   });
      // });
    }

    return handler;
  }
}

export { FindUsersByNameService };
