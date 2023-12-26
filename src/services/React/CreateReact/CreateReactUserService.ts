import { inject, injectable } from 'tsyringe';
import { v4 } from 'uuid';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { React } from '@entities/React/React';
import { AppError } from '@utils/AppError';
import { IReactRepository } from '@repositories/ReactRepository/IReactRepository';
import { IEmojiRepository } from '@repositories/EmojiRepository/IEmojiRepository';
import { IUserRepository } from '@repositories/UserRepository/IUserRepository';
import { INotificationRepository } from '@repositories/NotificationRepository/INotificationRepository';
import { ICreateReactUserDTO } from './ICreateReactServiceDTO';

dayjs.extend(utc);

@injectable()
class CreateReactUserService {
  constructor(
    @inject('ReactRepository')
    private reactRepository: IReactRepository,

    @inject('EmojiRepository')
    private emojiRepository: IEmojiRepository,

    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('NotificationRepository')
    private notificationRepository: INotificationRepository,
  ) {}

  async execute({
    emoji_id,
    message,
    user_id,
    reqUser,
  }: ICreateReactUserDTO): Promise<React> {
    const [requester, user, emoji] = await Promise.all([
      this.userRepository.findById(reqUser.id),
      this.userRepository.findById(user_id),
      this.emojiRepository.findById(emoji_id),
    ]);

    if (!requester) {
      throw new AppError('Login expirado, realize o login novamente.', 400);
    }

    if (!user) {
      throw new AppError('Usuário não encontrado.', 404);
    }

    if (!emoji) {
      throw new AppError('Emoji não encontrado.', 404);
    }

    const react = this.reactRepository.create({
      id: v4(),
      type: 'user',
      emoji_id: emoji.id_emoji,
      message,
      author_id: requester.id_user,
      receiver_id: user.id_user,
    });

    await this.reactRepository.save(react);

    const notification = this.notificationRepository.create({
      id: v4(),
      message: `${requester.name} reagiu a você! ${emoji.value}`,
      type: 'react_user',
      user_id: user.id_user,
      author_id: requester.id_user,
      react_id: react.id_react,
    });

    await this.notificationRepository.save(notification);

    return react;
  }
}

export { CreateReactUserService };
