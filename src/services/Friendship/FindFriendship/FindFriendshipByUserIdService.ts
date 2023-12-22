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
    user_id: string,
    reqUser: AuthorizedUser<UserPerm | PubPerm>,
  ): Promise<Friendship | undefined> {
    const friendship = await this.friendshipRepository.findByUserIds(
      reqUser.id,
      user_id,
    );

    return friendship;
  }
}

export { FindFriendshipByUserIdService };
