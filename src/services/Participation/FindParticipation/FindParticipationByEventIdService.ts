import { inject, injectable } from 'tsyringe';

import { Participation } from '@entities/Participation/Participation';
import { IParticipationRepository } from '@repositories/ParticipationRepository/IParticipationRepository';

@injectable()
class FindParticipationByEventIdService {
  constructor(
    @inject('ParticipationRepository')
    private participationRepository: IParticipationRepository,
  ) {}

  async execute(
    event_id: string,
    user: AuthorizedUser<UserPerm | PubPerm>,
  ): Promise<Participation | undefined> {
    const participation = await this.participationRepository.findByUserAndEvent(
      user.id,
      event_id,
    );

    return participation;
  }
}

export { FindParticipationByEventIdService };
