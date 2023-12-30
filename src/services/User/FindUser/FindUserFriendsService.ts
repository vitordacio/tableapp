import { inject, injectable } from 'tsyringe';
import { IFriendshipRepository } from '@repositories/FriendshipRepository/IFriendshipRepository';
import { IBlockRepository } from '@repositories/BlockRepository/IBlockRepository';
import { IUserRepository } from '@repositories/UserRepository/IUserRepository';
import { User } from '@entities/User/User';
import { AppError } from '@utils/AppError';
import { checkFriendship } from '@utils/handleFriendship';
import { IFindUserFriendsServiceDTO } from './IFindUsersServiceDTO';

@injectable()
class FindUserFriendsService {
  constructor(
    @inject('FriendshipRepository')
    private friendshipRepository: IFriendshipRepository,

    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('BlockRepository')
    private blockRepository: IBlockRepository,
  ) {}

  async execute({
    user_id,
    name,
    page,
    limit,
    reqUser,
  }: IFindUserFriendsServiceDTO): Promise<User[]> {
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
      throw new AppError('Usuário não encontrado.', 404);
    }

    let friends: User[] = [];
    const friend_ids: string[] = [];

    if (friendships.length !== 0) {
      friendships.forEach(friendship => {
        const friend =
          friendship.author.id_user === user_id
            ? friendship.receiver
            : friendship.author;

        friend_ids.push(friend.id_user);
        friends.push(friend);
      });

      const [checkFriends, userBlocks] = await Promise.all([
        this.friendshipRepository.checkFriends(reqUser.id, friend_ids),
        this.blockRepository.checkBlocks(user_id, friend_ids),
      ]);

      if (checkFriends.length !== 0 || userBlocks.length !== 0) {
        const handleFriends: User[] = [];

        friends.forEach(handleFriend => {
          const block = userBlocks.find(
            userBlock => userBlock.author_id === handleFriend.id_user,
          );
          if (block) return;

          const friendship = checkFriends.find(
            userFriendship =>
              userFriendship.author_id === handleFriend.id_user ||
              userFriendship.receiver_id === handleFriend.id_user,
          );

          handleFriend.friendship_id = friendship?.id_friendship || '';
          handleFriend.friendship_status = checkFriendship({
            user_id: reqUser.id,
            friendship,
          });

          handleFriends.push(handleFriend);
        });

        friends = handleFriends;
      }
    }

    return friends;
  }
}

export { FindUserFriendsService };
