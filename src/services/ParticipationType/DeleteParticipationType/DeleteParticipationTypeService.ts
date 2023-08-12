import { inject, injectable } from 'tsyringe';

import { AppError } from '@utils/AppError';
import { IParticipationTypeRepository } from '@repositories/ParticipationTypeRepository/IParticipationTypeRepository';

@injectable()
class DeleteParticipationTypeService {
  constructor(
    @inject('ParticipationTypeRepository')
    private ParticipationTypeRepository: IParticipationTypeRepository,
  ) {}

  async execute(Participation_id: string): Promise<void> {
    const ParticipationType = await this.ParticipationTypeRepository.findById(
      Participation_id,
    );

    if (!ParticipationType) {
      throw new AppError('Tipo não encontrado.', 404);
    }

    // await this.ParticipationTypeRepository.delete(ParticipationType.id_Participation_type);
    await this.ParticipationTypeRepository.remove(ParticipationType);
  }
}

export { DeleteParticipationTypeService };
