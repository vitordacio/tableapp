import { inject, injectable } from 'tsyringe';
import { User } from '@entities/User/User';
import { IUserRepository } from '@repositories/UserRepository/IUserRepository';
import { AppError } from '@utils/AppError';
import { IFriendshipRepository } from '@repositories/FriendshipRepository/IFriendshipRepository';
import { checkFriendship } from '@utils/handleFriendship';
import { checkCanSeeContent } from '@utils/handleUser';

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
    const [requester, profile, friendship] = await Promise.all([
      this.userRepository.findById(user.id),
      this.userRepository.findById(friend_id),
      this.friendshipRepository.findByUserIds(user.id, friend_id),
    ]);

    if (!requester) {
      throw new AppError('Token expirado, realize login novamente.', 403);
    }

    if (!profile) {
      throw new AppError('Usuário não encontrado.', 404);
    }

    profile.friendship_status = checkFriendship({
      user_id: requester.id_user,
      friendship,
    });

    profile.can_see_content = checkCanSeeContent({
      user_id: requester.id_user,
      profile,
    });

    return profile;
  }
}

export { FindUserByIdService };
