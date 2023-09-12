import { inject, injectable } from 'tsyringe';

import { v4 } from 'uuid';

import { AppError } from '@utils/AppError';
import { IFriendshipRepository } from '@repositories/FriendshipRepository/IFriendshipRepository';
import { IUserRepository } from '@repositories/UserRepository/IUserRepository';
import { INotificationRepository } from '@repositories/NotificationRepository/INotificationRepository';
import { Friendship } from '@entities/Friendship/Friendship';
import { ICreateResponseDTO } from './CreateResponseServiceDTO';

@injectable()
class CreateResponseService {
  constructor(
    @inject('FriendshipRepository')
    private friendshipRepository: IFriendshipRepository,

    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('NotificationRepository')
    private notificationRepository: INotificationRepository,
  ) {}

  async execute({
    friendship_id,
    accepted,
    user,
  }: ICreateResponseDTO): Promise<Friendship> {
    const friendship = await this.friendshipRepository.findById(friendship_id);

    if (!friendship) {
      throw new AppError('Solicitação não encontrada.', 404);
    }

    if (user.id !== friendship.receiver_id) {
      throw new AppError('Solicitação não pertence a esse usuário.', 403);
    }

    // if (friendship.reviwed_by_receiver) {
    //   throw new AppError('Solicitação já respondida.', 400);
    // }
    if (accepted && !friendship.accepted) {
      friendship.sender.friends += 1;
      friendship.receiver.friends += 1;
      await this.userRepository.saveMany([
        friendship.sender,
        friendship.receiver,
      ]);

      const notifcation = this.notificationRepository.create({
        id: v4(),
        message: `${friendship.receiver.name} aceitou o seu pedido de amizade!`,
        type: 'friendship',
        sent_by: user.id,
        user_id: friendship.sender.id_user,
        friendship_id: friendship.id_friendship,
      });

      await this.notificationRepository.save(notifcation);
    }

    friendship.reviwed_by_receiver = true;
    friendship.accepted = accepted;

    await this.friendshipRepository.save(friendship);

    return friendship;
  }
}

export { CreateResponseService };
