import { inject, injectable } from 'tsyringe';
import { AppError } from '@utils/AppError';
import { IEmojiRepository } from '@repositories/EmojiRepository/IEmojiRepository';
import { Emoji } from '@entities/Emoji/Emoji';
import { IEmojiTypeRepository } from '@repositories/EmojiTypeRepository/IEmojiTypeRepository';
import { EmojiType } from '@entities/EmojiType/EmojiType';
import { IUpdateEmojiDTO } from './IUpdateEmojiServiceDTO';

@injectable()
class UpdateEmojiService {
  constructor(
    @inject('EmojiRepository')
    private emojiRepository: IEmojiRepository,

    @inject('EmojiTypeRepository')
    private emojiTypeRepository: IEmojiTypeRepository,
  ) {}

  async execute({
    emoji_id,
    type_id,
    value,
    shorthand,
  }: IUpdateEmojiDTO): Promise<Emoji> {
    let type: EmojiType | undefined;
    const cleanedShorthand = shorthand.trim().toLowerCase();
    const [emoji, alreadyExistsValue, alreadyExistsShorthand] =
      await Promise.all([
        this.emojiRepository.findById(emoji_id),
        this.emojiRepository.findByValye(value),
        this.emojiRepository.findByShorthand(cleanedShorthand),
      ]);

    if (!emoji) {
      throw new AppError('Emoji não encontrado.', 404);
    }

    if (alreadyExistsValue) {
      throw new AppError('Emoji já cadastrado.', 400);
    }

    if (alreadyExistsShorthand) {
      throw new AppError('Abreviação já cadastrado.', 400);
    }

    if (type_id) {
      type = await this.emojiTypeRepository.findById(type_id);

      if (!type) {
        throw new AppError('Tipo de emoji não encontrado.', 404);
      }
    }

    emoji.value = value;
    emoji.shorthand = cleanedShorthand;
    if (type) emoji.type_id = type.id_emoji_type;

    await this.emojiRepository.save(emoji);

    return emoji;
  }
}

export { UpdateEmojiService };
