import { inject, injectable } from 'tsyringe';
import { User } from '@entities/User/User';
import { IUserRepository } from '@repositories/UserRepository/IUserRepository';
import { AppError } from '@utils/AppError';
import { IFriendshipRepository } from '@repositories/FriendshipRepository/IFriendshipRepository';

@injectable()
class FindUserByIdService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('FriendshipRepository')
    private friendshipRepository: IFriendshipRepository,
  ) {}

  async execute(
    friend_id: string,
    user: AuthorizedUser<UserPerm | PubPerm>,
  ): Promise<User> {
    const [foundUser, friend, friendship] = await Promise.all([
      this.userRepository.findById(user.id),
      this.userRepository.findById(friend_id),
      this.friendshipRepository.findByUserIds(user.id, friend_id),
    ]);

    if (!foundUser) {
      throw new AppError('Token expirado, realize login novamente.', 403);
    }

    if (!friend) {
      throw new AppError('Usuário não encontrado.', 404);
    }

    if (!friendship) {
      friend.friendship_status = '';
    } else if (friendship.confirmed) {
      friend.friendship_status = 'friends';
    } else {
      friend.friendship_status =
        friendship.author_id === user.id ? 'request_sent' : 'request_received';
    }

    return friend;
  }
}

export { FindUserByIdService };
