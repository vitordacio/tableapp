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
    let friendship;

    if (user.id === friend_id) {
      throw new AppError(
        'Não é possível enviar solicitação para você mesmo.',
        400,
      );
    }

    const foundUser = await this.userRepository.findById(user.id);

    if (!foundUser) {
      throw new AppError('Token expirado, realize login novamente.', 403);
    }

    const friend = await this.userRepository.findById(friend_id);

    if (!friend) {
      throw new AppError('Usuário não encontrado.', 404);
    }

    friendship = await this.friendshipRepository.findByUserId(
      user.id,
      friend_id,
    );

    if (friendship) {
      throw new AppError('Solicitação já existe.', 400);
    }

    friendship = this.friendshipRepository.create({
      id: v4(),
      sender_id: foundUser.id_user,
      receiver_id: friend.id_user,
    });

    await this.friendshipRepository.save(friendship);

    const notifcation = this.notificationRepository.create({
      id: v4(),
      message: `${foundUser.name} enviou uma solicitação de amizade`,
      type: 'friendship',
      sent_by: user.id,
      user_id: friend_id,
      friendship_id: friendship.id_friendship,
    });

    await this.notificationRepository.save(notifcation);

    return friendship;
  }
}

export { CreateRequestService };
