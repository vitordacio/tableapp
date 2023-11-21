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
    friend_id,
    user,
  }: ICreateResponseDTO): Promise<Friendship | void> {
    if (user.id === friend_id) {
      throw new AppError(
        'Não é possível responder solicitação de você mesmo.',
        400,
      );
    }

    const response = await this.friendshipRepository.findByUserIds(
      user.id,
      friend_id,
    );

    if (!response) {
      throw new AppError('Solicitação não encontrada.', 404);
    }

    if (user.id !== response.receiver_id) {
      throw new AppError('Solicitação não pertence a esse usuário.', 403);
    }

    response.confirmed = true;

    response.author.friends_count += 1;
    response.receiver.friends_count += 1;

    const notification = this.notificationRepository.create({
      id: v4(),
      message: `${response.receiver.name} aceitou sua solicitação de amizade! 🤝`,
      type: 'friendship',
      author_id: user.id,
      user_id: response.author.id_user,
      friendship_id: response.id_friendship,
    });

    // await this.notificationRepository.save(notification);

    await Promise.all([
      this.friendshipRepository.save(response),
      this.userRepository.saveMany([response.author, response.receiver]),
      await this.notificationRepository.save(notification),
    ]);

    return response;
  }
}

export { CreateResponseService };
