import { container, injectable } from 'tsyringe';
import { Emoji } from '@entities/Emoji/Emoji';
import { FindEmojiAnimalService } from './FindEmojiAnimalService';
import { FindEmojiBodyService } from './FindEmojiBodyService';
import { FindEmojiFaceService } from './FindEmojiFaceService';
import { FindEmojiPeopleService } from './FindEmojiPeopleService';
import { FindEmojiSymbolService } from './FindEmojiSymbolService';

type EmojisResponse = {
  animal: Emoji[];
  body: Emoji[];
  face: Emoji[];
  people: Emoji[];
  symbol: Emoji[];
};

@injectable()
class FindEmojiService {
  private findEmojiAnimalSerice: FindEmojiAnimalService;

  private findEmojiBodySerice: FindEmojiBodyService;

  private findEmojiFaceSerice: FindEmojiFaceService;

  private findEmojiPeopleSerice: FindEmojiPeopleService;

  private findEmojiSymbolSerice: FindEmojiSymbolService;

  constructor() {
    this.findEmojiAnimalSerice = container.resolve(FindEmojiAnimalService);
    this.findEmojiBodySerice = container.resolve(FindEmojiBodyService);
    this.findEmojiFaceSerice = container.resolve(FindEmojiFaceService);
    this.findEmojiPeopleSerice = container.resolve(FindEmojiPeopleService);
    this.findEmojiSymbolSerice = container.resolve(FindEmojiSymbolService);
  }

  async execute(page?: number, limit?: number): Promise<EmojisResponse> {
    const emojis: EmojisResponse = {
      animal: [],
      body: [],
      face: [],
      people: [],
      symbol: [],
    };
    const [animal, body, face, people, symbol] = await Promise.all([
      this.findEmojiAnimalSerice.execute(page, limit),
      this.findEmojiBodySerice.execute(page, limit),
      this.findEmojiFaceSerice.execute(page, limit),
      this.findEmojiPeopleSerice.execute(page, limit),
      this.findEmojiSymbolSerice.execute(page, limit),
    ]);

    emojis.animal = animal;
    emojis.body = body;
    emojis.face = face;
    emojis.people = people;
    emojis.symbol = symbol;

    return emojis;
  }
}

export { FindEmojiService };
