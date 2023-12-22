import { inject, injectable } from 'tsyringe';
import { User, UserControl } from '@entities/User/User';
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
    user_id: string,
    reqUser: AuthorizedUser<UserPerm | PubPerm>,
  ): Promise<User> {
    const [requester, user, friendship] = await Promise.all([
      this.userRepository.findById(reqUser.id),
      this.userRepository.findById(user_id),
      this.friendshipRepository.findByUserIds(reqUser.id, user_id),
    ]);

    if (!requester) {
      throw new AppError('Token expirado, realize login novamente.', 403);
    }

    if (!user) {
      throw new AppError('Usuário não encontrado.', 404);
    }

    const control: UserControl = {
      friendship_id: friendship?.id_friendship || '',
      friendship_status: checkFriendship({
        user_id: requester.id_user,
        friendship,
      }),
      can_see_content: checkCanSeeContent({
        requester_id: requester.id_user,
        user,
      }),
    };

    user.control = control;

    // user.friendship_status = checkFriendship({
    //   user_id: requester.id_user,
    //   friendship,
    // });

    // user.can_see_content = checkCanSeeContent({
    //   requester_id: requester.id_user,
    //   user,
    // });

    return user;
  }
}

export { FindUserByIdService };
