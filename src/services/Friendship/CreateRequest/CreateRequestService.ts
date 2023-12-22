import { inject, injectable } from 'tsyringe';
import { v4 } from 'uuid';

import { AppError } from '@utils/AppError';
import { Friendship } from '@entities/Friendship/Friendship';
import { IFriendshipRepository } from '@repositories/FriendshipRepository/IFriendshipRepository';
import { IUserRepository } from '@repositories/UserRepository/IUserRepository';
import { INotificationRepository } from '@repositories/NotificationRepository/INotificationRepository';
import { checkCanSeeContent } from '@utils/handleUser';
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

  async execute({ user_id, reqUser }: ICreateRequestDTO): Promise<Friendship> {
    if (reqUser.id === user_id) {
      throw new AppError(
        'Não é possível enviar solicitação para você mesmo.',
        400,
      );
    }

    const [requester, user, alreadyFriendship] = await Promise.all([
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

    if (alreadyFriendship) {
      throw new AppError(
        `${alreadyFriendship.confirmed ? 'Amizade' : 'Solicitação'} já existe`,
        400,
      );
    }

    const friendship = this.friendshipRepository.create({
      id: v4(),
      author_id: requester.id_user,
      receiver_id: user.id_user,
    });

    await this.friendshipRepository.save(friendship);

    const notification = this.notificationRepository.create({
      id: v4(),
      message: `${requester.name} quer ser seu amigo! 🤝`,
      type: 'friendship',
      author_id: requester.id_user,
      user_id: user.id_user,
      friendship_id: friendship.id_friendship,
    });

    await this.notificationRepository.save(notification);

    friendship.control = {
      friendship_id: friendship.id_friendship,
      friendship_status: 'request_sent',
      can_see_content: checkCanSeeContent({
        requester_id: requester.id_user,
        user,
      }),
    };

    return friendship;
  }
}

export { CreateRequestService };
