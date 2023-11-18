import { inject, injectable } from 'tsyringe';
import { v4 } from 'uuid';

import { AppError } from '@utils/AppError';
import { Friendship } from '@entities/Friendship/Friendship';
import { IFriendshipRepository } from '@repositories/FriendshipRepository/IFriendshipRepository';
import { IUserRepository } from '@repositories/UserRepository/IUserRepository';
import { INotificationRepository } from '@repositories/NotificationRepository/INotificationRepository';
import { ICreateRequestDTO } from './CreateRequestServiceDTO';

@injectable()
class CreateRequestService {
  constructor(
    @inject('FriendshipRepository')
    private friendshipRepository: IFriendshipRepository,

    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('NotificationRepository')
    private notificationRepository: INotificationRepository,
  ) {}

  async execute({ friend_id, user }: ICreateRequestDTO): Promise<Friendship> {
    if (user.id === friend_id) {
      throw new AppError(
        'Não é possível enviar solicitação para você mesmo.',
        400,
      );
    }

    const [foundUser, friend, friendship] = await Promise.all([
      this.userRepository.findById(user.id),
      this.userRepository.findById(friend_id),
      this.friendshipRepository.findByUserIds(user.id, friend_id),
    ]);

    if (!foundUser) {
      throw new AppError('Token expirado, realize login novamente.', 403);
    }

    if (!friend) {
      throw new AppError('Usuário não encontrado.', 404);
    }

    if (friendship) {
      throw new AppError(
        `${friendship.confirmed ? 'Amizade' : 'Solicitação'} já existe`,
        400,
      );
    }

    const request = this.friendshipRepository.create({
      id: v4(),
      author_id: foundUser.id_user,
      receiver_id: friend.id_user,
    });

    await this.friendshipRepository.save(request);

    const notification = this.notificationRepository.create({
      id: v4(),
      message: `${foundUser.name} quer ser seu amigo! 🤝`,
      type: 'friendship',
      author_id: user.id,
      user_id: friend_id,
      friendship_id: request.id_friendship,
    });

    await this.notificationRepository.save(notification);

    return request;
  }
}

export { CreateRequestService };
