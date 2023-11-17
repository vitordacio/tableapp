import { inject, injectable } from 'tsyringe';

import { User } from '@entities/User/User';
import { IUserRepository } from '@repositories/UserRepository/IUserRepository';
import { AppError } from '@utils/AppError';
import { Friendship } from '@entities/Friendship/Friendship';
import { Address } from '@entities/Address/Address';
import { Event } from '@entities/Event/Event';
import { sortByDate } from '@utils/handleUser';

@injectable()
class FindUserByIdService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute(user_id: string): Promise<User> {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new AppError('Usuário não encontrado.', 404);
    }

    if (user.role_name === 'pub') {
      let pubEvents: Event[] = [...user.events];

      user.addresses.forEach(address => {
        pubEvents = [...pubEvents, ...address.events];
      });

      user.events = pubEvents;

      user.addresses.forEach(address => {
        address.events = undefined as unknown as Event[];
      });

      user.addresses = sortByDate(user.addresses, 'updated_at');
    }

    if (user.role_name === 'user') {
      user.addresses = undefined as unknown as Address[];
      let friendships: Friendship[] = [
        ...user.sentFriendRequests,
        ...user.receivedFriendRequests,
      ];
      let friends: User[] = [];

      friendships = sortByDate(friendships, 'updated_at');
      friendships.forEach(friendship => {
        if (!friendship.accepted) return;
        if (user.id_user === friendship.author_id) {
          friends = [...friends, friendship.receiver];
        } else {
          friends = [...friends, friendship.author];
        }
      });
      user.friends = friends;

      user.participations = user.participations.filter(
        participation =>
          (participation.confirmed_by_user && participation.in) ||
          !participation.confirmed_by_user,
      );
      user.participations = sortByDate(user.participations, 'updated_at');
    }

    user.sentFriendRequests = undefined as unknown as Friendship[];
    user.receivedFriendRequests = undefined as unknown as Friendship[];

    user.events = sortByDate(user.events, 'finish_date');

    return user;
  }
}

export { FindUserByIdService };
