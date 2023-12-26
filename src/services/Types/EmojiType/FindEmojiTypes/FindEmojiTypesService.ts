import { inject, injectable } from 'tsyringe';
import { EmojiType } from '@entities/EmojiType/EmojiType';
import { IEmojiTypeRepository } from '@repositories/EmojiTypeRepository/IEmojiTypeRepository';

@injectable()
class FindEmojiTypesService {
  constructor(
    @inject('EmojiTypeRepository')
    private emojiTypeRepository: IEmojiTypeRepository,
  ) {}

  async execute(): Promise<EmojiType[]> {
    const types = await this.emojiTypeRepository.findIndex();

    return types;
  }
}

export { FindEmojiTypesService };
