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
    user_id: string,
    reqUser: AuthorizedUser<UserPerm | PubPerm>,
  ): Promise<void> {
    const friendship = await this.friendshipRepository.findToRemove(
      reqUser.id,
      user_id,
    );

    if (
      !friendship ||
      (friendship.author_id !== reqUser.id &&
        friendship.receiver_id !== reqUser.id)
    ) {
      throw new AppError('Amizade não encontrada.', 404);
    }

    if (friendship.confirmed) {
      friendship.author.friends_count -= 1;
      friendship.receiver.friends_count -= 1;
    }

    await Promise.all([
      this.userRepository.saveMany([friendship.author, friendship.receiver]),
      this.friendshipRepository.remove(friendship),
    ]);
  }
}

export { DeleteFriendshipService };
