import { inject, injectable } from 'tsyringe';
import { v4 } from 'uuid';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { Emoji } from '@entities/Emoji/Emoji';
import { AppError } from '@utils/AppError';
import { IEmojiRepository } from '@repositories/EmojiRepository/IEmojiRepository';
import { IEmojiTypeRepository } from '@repositories/EmojiTypeRepository/IEmojiTypeRepository';
import { ICreateEmojiDTO } from './ICreateEmojiServiceDTO';

dayjs.extend(utc);

@injectable()
class CreateEmojiService {
  constructor(
    @inject('EmojiRepository')
    private emojiRepository: IEmojiRepository,

    @inject('EmojiTypeRepository')
    private emojiTypeRepository: IEmojiTypeRepository,
  ) {}

  async execute({
    type_id,
    value,
    shorthand,
  }: ICreateEmojiDTO): Promise<Emoji> {
    const cleanedShorthand = shorthand.trim().toLowerCase();
    const [alreadyExistsValue, alreadyExistsShorthand, findLastInOrder, type] =
      await Promise.all([
        this.emojiRepository.findByValye(value),
        this.emojiRepository.findByShorthand(cleanedShorthand),
        this.emojiRepository.findLastInOrder(),
        this.emojiTypeRepository.findById(type_id),
      ]);

    if (alreadyExistsValue) {
      throw new AppError('Emoji já cadastrado.', 400);
    }

    if (alreadyExistsShorthand) {
      throw new AppError('Abreviação já cadastrado.', 400);
    }

    if (!type) {
      throw new AppError('Tipo de emoji não encontrado.', 404);
    }

    const emoji = this.emojiRepository.create({
      id: v4(),
      type_id,
      value,
      shorthand: cleanedShorthand,
      order: findLastInOrder ? findLastInOrder.order + 1 : 1,
    });

    await this.emojiRepository.save(emoji);

    return emoji;
  }
}

export { CreateEmojiService };
