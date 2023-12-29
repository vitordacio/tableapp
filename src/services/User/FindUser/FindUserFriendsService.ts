import { inject, injectable } from 'tsyringe';
import { IFriendshipRepository } from '@repositories/FriendshipRepository/IFriendshipRepository';
import { User } from '@entities/User/User';
import { IUserRepository } from '@repositories/UserRepository/IUserRepository';
import { AppError } from '@utils/AppError';
import { IFindUserFriendsServiceDTO } from './IFindUsersServiceDTO';

@injectable()
class FindUserFriendsService {
  constructor(
    @inject('FriendshipRepository')
    private friendshipRepository: IFriendshipRepository,

    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute({
    user_id,
    name,
    page,
    limit,
  }: IFindUserFriendsServiceDTO): Promise<User[]> {
    const [user, friendships] = await Promise.all([
      this.userRepository.findById(user_id),
      name
        ? await this.friendshipRepository.findFriendsByUserIdAndName(
            user_id,
            page || 1,
            limit || 20,
            name || '',
          )
        : await this.friendshipRepository.findLatestByUserId(
            user_id,
            page || 1,
            limit || 20,
          ),
    ]);

    if (!user) {
      throw new AppError('Usuário não encontrado', 404);
    }

    const friends = friendships.map(friendship =>
      friendship.author.id_user === user_id
        ? friendship.receiver
        : friendship.author,
    );

    return friends;
  }
}

export { FindUserFriendsService };
