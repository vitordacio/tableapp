import { inject, injectable } from 'tsyringe';

import { User } from '@entities/User/User';
import { IUserRepository } from '@repositories/UserRepository/IUserRepository';
import { IFriendshipRepository } from '@repositories/FriendshipRepository/IFriendshipRepository';
import { AppError } from '@utils/AppError';
import { generateUserControl } from '@utils/handleControl';
import { IFindUsersServiceDTO } from './IFindUsersServiceDTO';

@injectable()
class FindUsersByNameService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('FriendshipRepository')
    private friendshipRepository: IFriendshipRepository,
  ) {}

  async execute({
    name,
    page,
    limit,
    reqUser,
  }: IFindUsersServiceDTO): Promise<User[]> {
    const friend_ids: string[] = [];

    const [requester, users] = await Promise.all([
      this.userRepository.findById(reqUser.id),
      this.userRepository.findByName(name || '', page || 1, limit || 20),
    ]);

    if (!requester) {
      throw new AppError('Token expirado, realize login novamente.', 403);
    }

    const handler: User[] = [];
    users.forEach(searched => {
      if (reqUser.id === searched.id_user) return;

      friend_ids.push(searched.id_user);
      handler.push(searched);
    });

    if (handler.length !== 0) {
      const userFriendships = await this.friendshipRepository.checkFriends(
        reqUser.id,
        friend_ids,
      );

      handler.forEach(searched => {
        const friendship = userFriendships.find(
          userFriendship =>
            userFriendship.author.id_user === searched.id_user ||
            userFriendship.receiver.id_user === searched.id_user,
        );

        searched.control = generateUserControl({
          friendship,
          requester,
          user: searched,
        });
      });
    }

    return handler;
  }
}

export { FindUsersByNameService };
