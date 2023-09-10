import { inject, injectable } from 'tsyringe';

import { Participation } from '@entities/Participation/Participation';
import { IParticipationRepository } from '@repositories/ParticipationRepository/IParticipationRepository';

import { AppError } from '@utils/AppError';

@injectable()
class FindParticipationsByUserService {
  constructor(
    @inject('ParticipationRepository')
    private participationRepository: IParticipationRepository,
  ) {}

  async execute(
    user: AuthorizedUser<UserPerm | PubPerm>,
  ): Promise<Participation[]> {
    const participations = await this.participationRepository.findByUser(
      user.id,
    );

    if (!participations) {
      throw new AppError('Participação não encontrado.', 404);
    }

    return participations;
  }
}

export { FindParticipationsByUserService };
