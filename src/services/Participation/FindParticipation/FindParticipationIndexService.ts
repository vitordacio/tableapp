import { inject, injectable } from 'tsyringe';

import { Participation } from '@entities/Participation/Participation';
import { IParticipationRepository } from '@repositories/ParticipationRepository/IParticipationRepository';

import { AppError } from '@utils/AppError';

@injectable()
class FindParticipationIndexService {
  constructor(
    @inject('ParticipationRepository')
    private participationRepository: IParticipationRepository,
  ) {}

  async execute(): Promise<Participation[]> {
    const participation = await this.participationRepository.findIndex();

    if (!participation) {
      throw new AppError('Participação não encontrado.', 404);
    }

    return participation;
  }
}

export { FindParticipationIndexService };
