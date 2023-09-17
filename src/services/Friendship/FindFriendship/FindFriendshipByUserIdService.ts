import { inject, injectable } from 'tsyringe';

import { Friendship } from '@entities/Friendship/Friendship';
import { IFriendshipRepository } from '@repositories/FriendshipRepository/IFriendshipRepository';

@injectable()
class FindFriendshipByUserIdService {
  constructor(
    @inject('FriendshipRepository')
    private friendshipRepository: IFriendshipRepository,
  ) {}

  async execute(
    friend_id: string,
    user: AuthorizedUser<UserPerm | PubPerm>,
  ): Promise<Friendship | undefined> {
    const friendship = await this.friendshipRepository.findByUserIds(
      user.id,
      friend_id,
    );

    return friendship;
  }
}

export { FindFriendshipByUserIdService };
