import { inject, injectable } from 'tsyringe';

import { Participation } from '@entities/Participation/Participation';
import { IParticipationRepository } from '@repositories/ParticipationRepository/IParticipationRepository';

import { AppError } from '@utils/AppError';

@injectable()
class FindParticipationByIdService {
  constructor(
    @inject('ParticipationRepository')
    private participationRepository: IParticipationRepository,
  ) {}

  async execute(participation_id: string): Promise<Participation> {
    const participation = await this.participationRepository.findById(
      participation_id,
    );

    if (!participation) {
      throw new AppError('Participação não encontrado.', 404);
    }

    return participation;
  }
}

export { FindParticipationByIdService };
