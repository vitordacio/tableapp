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
    friendship_id: string,
    user: AuthorizedUser<UserPerm | PubPerm>,
  ): Promise<void> {
    const friendship = await this.friendshipRepository.findById(friendship_id);

    if (
      !friendship ||
      (friendship.sender_id !== user.id && friendship.receiver_id !== user.id)
    ) {
      throw new AppError('Amizade não encontrada.', 404);
    }

    await this.friendshipRepository.remove(friendship);

    if (friendship.accepted) {
      friendship.sender.friends -= 1;
      friendship.receiver.friends -= 1;
      await this.userRepository.saveMany([
        friendship.sender,
        friendship.receiver,
      ]);
    }
  }
}

export { DeleteFriendshipService };
