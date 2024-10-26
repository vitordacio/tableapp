import { inject, injectable } from 'tsyringe';

import { Friendship } from '@entities/Friendship/Friendship';
import { IFriendshipRepository } from '@repositories/FriendshipRepository/IFriendshipRepository';

import { AppError } from '@utils/AppError';

@injectable()
class FindFriendshipByIdService {
  constructor(
    @inject('FriendshipRepository')
    private friendshipRepository: IFriendshipRepository,
  ) {}

  async execute(
    friendship_id: string,
    reqUser: AuthorizedUser<UserPerm | PubPerm>,
  ): Promise<Friendship> {
    const friendship = await this.friendshipRepository.findById(friendship_id);

    if (
      !friendship ||
      (friendship.author_id !== reqUser.id &&
        friendship.receiver_id !== reqUser.id)
    ) {
      throw new AppError('Amizade não encontrada.', 404);
    }

    return friendship;
  }
}

export { FindFriendshipByIdService };
