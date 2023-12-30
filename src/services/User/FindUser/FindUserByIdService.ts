import { inject, injectable } from 'tsyringe';
import { User } from '@entities/User/User';
import { IUserRepository } from '@repositories/UserRepository/IUserRepository';
import { AppError } from '@utils/AppError';
import { IFriendshipRepository } from '@repositories/FriendshipRepository/IFriendshipRepository';
import { IReactRepository } from '@repositories/ReactRepository/IReactRepository';
import { IBlockRepository } from '@repositories/BlockRepository/IBlockRepository';
import { checkCanSeeUserContent } from '@utils/handleUser';
import { checkFriendship } from '@utils/handleFriendship';

@injectable()
class FindUserByIdService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('FriendshipRepository')
    private friendshipRepository: IFriendshipRepository,

    @inject('BlockRepository')
    private blockRepository: IBlockRepository,

    @inject('ReactRepository')
    private reactRepository: IReactRepository,
  ) {}

  async execute(
    user_id: string,
    reqUser: AuthorizedUser<UserPerm | PubPerm>,
  ): Promise<User> {
    const [requester, user] = await Promise.all([
      this.userRepository.findById(reqUser.id),
      this.userRepository.findById(user_id),
    ]);

    if (!requester) {
      throw new AppError('Token expirado, realize login novamente.', 403);
    }

    if (!user) {
      throw new AppError('Usuário não encontrado.', 404);
    }

    const [friendship, block, react] = await Promise.all([
      this.friendshipRepository.findByUserIds(reqUser.id, user_id),
      this.blockRepository.findByAuthorAndReceiver(user_id, reqUser.id),
      this.reactRepository.findByUsers(requester.id_user, user.id_user),
    ]);

    user.blocked = !!block;
    user.react_id = react?.id_react || '';
    user.friendship_id = friendship?.id_friendship || '';
    user.friendship_status = checkFriendship({
      user_id: requester.id_user,
      friendship,
    });
    user.can_see_content = !block
      ? checkCanSeeUserContent({
          friendship_status: user.friendship_status,
          requester,
          user,
        })
      : false;

    return user;
  }
}

export { FindUserByIdService };
