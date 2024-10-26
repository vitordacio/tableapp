import { container, injectable } from 'tsyringe';
import { FetchEmojiService } from '@services/Emoji/FetchEmoji/FetchEmojiService';
import { FetchEventTypesService } from './EventType/FetchEventTypes/FetchEventTypesService';
import { FetchParticipationTypesService } from './ParticipationType/FetchParticipationTypes/FetchParticipationTypesService';
import { FetchSocialNetworkTypesService } from './SocialNetworkType/FetchSocialNetworkTypes/FetchSocialNetworkTypesService';
import { FetchEmojiTypesService } from './EmojiType/FetchEmojiTypes/FetchEmojiTypesService';
import { FetchAchievementTypesService } from './AchievementType/FetchAchievementTypes/FetchAchievementTypesService';

@injectable()
class FetchMasterService {
  private fetchEventTypesService: FetchEventTypesService;

  private fetchParticipationTypesService: FetchParticipationTypesService;

  private fetchSocialNetworkTypesService: FetchSocialNetworkTypesService;

  private fetchEmojiTypesService: FetchEmojiTypesService;

  private fetchAchievementTypesService: FetchAchievementTypesService;

  private fetchEmojiService: FetchEmojiService;

  constructor() {
    this.fetchEventTypesService = container.resolve(FetchEventTypesService);
    this.fetchParticipationTypesService = container.resolve(
      FetchParticipationTypesService,
    );
    this.fetchSocialNetworkTypesService = container.resolve(
      FetchSocialNetworkTypesService,
    );
    this.fetchEmojiTypesService = container.resolve(FetchEmojiTypesService);
    this.fetchAchievementTypesService = container.resolve(
      FetchAchievementTypesService,
    );
    this.fetchEmojiService = container.resolve(FetchEmojiService);
  }

  async execute(): Promise<void> {
    await Promise.all([
      this.fetchEventTypesService.execute(),
      this.fetchParticipationTypesService.execute(),
      this.fetchSocialNetworkTypesService.execute(),
      this.fetchEmojiTypesService.execute(),
      this.fetchAchievementTypesService.execute(),
    ]);

    await this.fetchEmojiService.execute();
  }
}

export { FetchMasterService };
