import { inject, injectable } from 'tsyringe';

import { v4 } from 'uuid';

import { AppError } from '@utils/AppError';
import { IFriendshipRepository } from '@repositories/FriendshipRepository/IFriendshipRepository';
import { IUserRepository } from '@repositories/UserRepository/IUserRepository';
import { INotificationRepository } from '@repositories/NotificationRepository/INotificationRepository';
import { IBlockRepository } from '@repositories/BlockRepository/IBlockRepository';
import { checkCanSeeUserContent } from '@utils/handleUser';
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

    @inject('BlockRepository')
    private blockRepository: IBlockRepository,
  ) {}

  async execute({
    user_id,
    reqUser,
  }: ICreateResponseDTO): Promise<Friendship | void> {
    if (reqUser.id === user_id) {
      throw new AppError(
        'Não é possível responder solicitação de você mesmo.',
        400,
      );
    }

    const [friendship, block] = await Promise.all([
      this.friendshipRepository.findByUserIds(reqUser.id, user_id),
      this.blockRepository.findByAuthorAndReceiver(user_id, reqUser.id),
    ]);

    // const friendship = await this.friendshipRepository.findByUserIds(
    //   reqUser.id,
    //   user_id,
    // );

    if (!friendship) {
      throw new AppError('Solicitação não encontrada.', 404);
    }

    if (reqUser.id !== friendship.receiver_id) {
      throw new AppError('Solicitação não pertence a esse usuário.', 403);
    }

    friendship.confirmed = true;

    friendship.author.friends_count += 1;
    friendship.receiver.friends_count += 1;

    const notification = this.notificationRepository.create({
      id: v4(),
      message: `${friendship.receiver.name} aceitou sua solicitação de amizade! 🤝`,
      type: 'friendship',
      author_id: reqUser.id,
      user_id: friendship.author.id_user,
      friendship_id: friendship.id_friendship,
    });

    await Promise.all([
      this.friendshipRepository.save(friendship),
      this.userRepository.saveMany([friendship.author, friendship.receiver]),
      await this.notificationRepository.save(notification),
    ]);

    friendship.friendship_id = friendship.id_friendship;
    friendship.friendship_status = 'friends';
    friendship.can_see_content = !block
      ? checkCanSeeUserContent({
          friendship_status: friendship.friendship_status,
          requester: friendship.receiver,
          user: friendship.author,
        })
      : false;

    return friendship;
  }
}

export { CreateResponseService };
