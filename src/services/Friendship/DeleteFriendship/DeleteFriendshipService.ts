import { inject, injectable } from 'tsyringe';

import { IFriendshipRepository } from '@repositories/FriendshipRepository/IFriendshipRepository';

import { AppError } from '@utils/AppError';
import { IUserRepository } from '@repositories/UserRepository/IUserRepository';

@injectable()
class DeleteFriendshipService {
  constructor(
    @inject('FriendshipRepository')
    private friendshipRepository: IFriendshipRepository,

    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute(
    friend_id: string,
    user: AuthorizedUser<UserPerm | PubPerm>,
  ): Promise<void> {
    const friendship = await this.friendshipRepository.findByUserIds(
      user.id,
      friend_id,
    );

    if (
      !friendship ||
      (friendship.author_id !== user.id && friendship.receiver_id !== user.id)
    ) {
      throw new AppError('Amizade não encontrada.', 404);
    }

    // await this.friendshipRepository.remove(friendship);

    friendship.author.friends_count -= 1;
    friendship.receiver.friends_count -= 1;
    // await this.userRepository.saveMany([
    //   friendship.author,
    //   friendship.receiver,
    // ]);

    await Promise.all([
      this.friendshipRepository.remove(friendship),
      this.userRepository.saveMany([friendship.author, friendship.receiver]),
    ]);
  }
}

export { DeleteFriendshipService };
