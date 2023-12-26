import { inject, injectable } from 'tsyringe';
import { v4 } from 'uuid';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { React } from '@entities/React/React';
import { AppError } from '@utils/AppError';
import { IReactRepository } from '@repositories/ReactRepository/IReactRepository';
import { IEmojiRepository } from '@repositories/EmojiRepository/IEmojiRepository';
import { IUserRepository } from '@repositories/UserRepository/IUserRepository';
import { IEventRepository } from '@repositories/EventRepository/IEventRepository';
import { ICreateReactEventDTO } from './ICreateReactServiceDTO';

dayjs.extend(utc);

@injectable()
class CreateReactEventService {
  constructor(
    @inject('ReactRepository')
    private reactRepository: IReactRepository,

    @inject('EmojiRepository')
    private emojiRepository: IEmojiRepository,

    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('EventRepository')
    private eventRepository: IEventRepository,
  ) {}

  async execute({
    emoji_id,
    message,
    event_id,
    reqUser,
  }: ICreateReactEventDTO): Promise<React> {
    const [user, event, emoji] = await Promise.all([
      this.userRepository.findById(reqUser.id),
      this.eventRepository.findById(event_id),
      this.emojiRepository.findById(emoji_id),
    ]);

    if (!user) {
      throw new AppError('Login expirado, realize o login novamente.', 400);
    }

    if (!event) {
      throw new AppError('Evento não encontrado.', 404);
    }

    if (!emoji) {
      throw new AppError('Emoji não encontrado.', 404);
    }

    const react = this.reactRepository.create({
      id: v4(),
      type: 'event',
      emoji_id: emoji.id_emoji,
      message,
      author_id: user.id_user,
      event_id: event.id_event,
    });

    await this.reactRepository.save(react);

    return react;
  }
}

export { CreateReactEventService };
