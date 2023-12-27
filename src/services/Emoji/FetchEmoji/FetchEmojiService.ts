import { container, injectable } from 'tsyringe';
import { FetchEmojiFaceService } from './FetchEmojiFaceService';
import { FetchEmojiAnimalService } from './FetchEmojiAnimalService';
import { FetchEmojiBodyService } from './FetchEmojiBodyService';
import { FetchEmojiPeopleService } from './FetchEmojiPeopleService';
import { FetchEmojiSymbolService } from './FetchEmojiSymbolService';

@injectable()
class FetchEmojiService {
  private fetchEmojiAnimalService: FetchEmojiAnimalService;

  private fetchEmojiBodyService: FetchEmojiBodyService;

  private fetchEmojiFaceService: FetchEmojiFaceService;

  private fetchEmojiPeopleService: FetchEmojiPeopleService;

  private fetchEmojiSymbolService: FetchEmojiSymbolService;

  constructor() {
    this.fetchEmojiAnimalService = container.resolve(FetchEmojiAnimalService);
    this.fetchEmojiBodyService = container.resolve(FetchEmojiBodyService);
    this.fetchEmojiFaceService = container.resolve(FetchEmojiFaceService);
    this.fetchEmojiPeopleService = container.resolve(FetchEmojiPeopleService);
    this.fetchEmojiSymbolService = container.resolve(FetchEmojiSymbolService);
  }

  async execute(): Promise<void> {
    await Promise.all([
      this.fetchEmojiAnimalService.execute(),
      this.fetchEmojiBodyService.execute(),
      this.fetchEmojiFaceService.execute(),
      this.fetchEmojiPeopleService.execute(),
      this.fetchEmojiSymbolService.execute(),
    ]);
  }
}

export { FetchEmojiService };
