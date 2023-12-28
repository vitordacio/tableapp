import { inject, injectable } from 'tsyringe';

import { IFriendshipRepository } from '@repositories/FriendshipRepository/IFriendshipRepository';
import { User } from '@entities/User/User';
import { IUserRepository } from '@repositories/UserRepository/IUserRepository';
import { AppError } from '@utils/AppError';
import { generateUserControl } from '@utils/handleControl';
import { IFindUserFriendsServiceDTO } from './IFindUsersServiceDTO';

@injectable()
class FindUserFriendsService {
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
  }: IFindUserFriendsServiceDTO): Promise<User[]> {
    const user_ids: string[] = [];
    const friends: User[] = [];

    const [requester, user, friendships] = await Promise.all([
      this.userRepository.findById(reqUser.id),
      this.userRepository.findById(user_id),
      name
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
          ),
    ]);

    if (!requester) {
      throw new AppError('Token expirado, realize login novamente.', 403);
    }

    if (!user) {
      throw new AppError('Usuário não encontrado', 404);
    }

    friendships.forEach(friendship => {
      const friend =
        friendship.author.id_user === user_id
          ? friendship.receiver
          : friendship.author;

      if (friend.id_user !== reqUser.id) user_ids.push(friend.id_user);
      friends.push(friend);
    });

    if (user_ids.length) {
      const userFriendships = await this.friendshipRepository.checkFriends(
        reqUser.id,
        user_ids,
      );

      friends.forEach(friend => {
        const friendship = userFriendships.find(
          userFriendship =>
            userFriendship.author.id_user === friend.id_user ||
            userFriendship.receiver.id_user === friend.id_user,
        );

        friend.control = generateUserControl({
          friendship,
          requester,
          user: friend,
        });
      });
    }

    return friends;
  }
}

export { FindUserFriendsService };
