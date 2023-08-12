import { inject, injectable } from 'tsyringe';

import { IParticipationRepository } from '@repositories/ParticipationRepository/IParticipationRepository';

import { AppError } from '@utils/AppError';

@injectable()
class DeleteParticipationService {
  constructor(
    @inject('ParticipationRepository')
    private participationRepository: IParticipationRepository,
  ) {}

  async execute(participation_id: string): Promise<void> {
    const participation = await this.participationRepository.findById(
      participation_id,
    );

    if (!participation) {
      throw new AppError('Participação não encontrada.', 404);
    }

    await this.participationRepository.remove(participation);
    // await this.ParticipationRepository.remove(Participation);
  }
}

export { DeleteParticipationService };
