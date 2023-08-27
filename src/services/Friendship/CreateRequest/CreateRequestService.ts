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
    // let friendship: Friendship | undefined;
    const foundUser = await this.userRepository.findById(user.id);

    if (!foundUser) {
      throw new AppError('Não autorizado.', 403);
    }

    const friend = await this.userRepository.findById(friend_id);

    if (!friend) {
      throw new AppError('Usuário não encontrado.', 404);
    }

    const [userSent, friendSent] = await Promise.all([
      this.friendshipRepository.findBySenderAndReceiver(
        foundUser.id_user,
        friend.id_user,
      ),
      this.friendshipRepository.findBySenderAndReceiver(
        friend.id_user,
        foundUser.id_user,
      ),
    ]);

    if (userSent || friendSent) {
      throw new AppError('Solicitação já existe.', 400);
    }

    const friendship = this.friendshipRepository.create({
      id: v4(),
      sender: foundUser,
      receiver: friend,
    });

    // const alreadySent = await this.friendshipRepository.findBySenderAndReceiver(
    //   foundUser.id_user,
    //   friend.id_user,
    // );

    // if (alreadySent) {
    //   throw new AppError('Solicitação já enviada.', 400);
    // }

    // friendship = await this.friendshipRepository.findBySenderAndReceiver(
    //   friend.id_user,
    //   foundUser.id_user,
    // );

    // if (friendship?.accepted) {
    //   throw new AppError('Usuários já são amigos.', 403);
    // }

    // if (friendship) {
    //   friendship.accepted = true;
    //   foundUser.friends += 1;
    //   friend.friends += 1;
    //   await this.userRepository.saveMany([foundUser, friend]);
    // } else {
    //   friendship = this.friendshipRepository.create({
    //     id: v4(),
    //     sender: foundUser,
    //     receiver: friend,
    //   });
    // }

    await this.friendshipRepository.save(friendship);

    // notificaçao para dono

    const notifcation = this.notificationRepository.create({
      id: v4(),
      message: `${foundUser.name} enviou uma solicitação de amizade`,
      type: 'friendship_request',
      sent_by: user.id,
      user_id: friend_id,
      friendship_id: friendship.id_friendship,
    });

    await this.notificationRepository.save(notifcation);

    return friendship;
  }
}

export { CreateRequestService };
