import { inject, injectable } from 'tsyringe';

import { AppError } from '@utils/AppError';
import { IParticipationTypeRepository } from '@repositories/ParticipationTypeRepository/IParticipationTypeRepository';
import { ParticipationType } from '@entities/ParticipationType/ParticipationType';

@injectable()
class FindParticipationTypeIndexService {
  constructor(
    @inject('ParticipationTypeRepository')
    private ParticipationTypeRepository: IParticipationTypeRepository,
  ) {}

  async execute(): Promise<ParticipationType[]> {
    const ParticipationTypes =
      await this.ParticipationTypeRepository.findIndex();

    if (!ParticipationTypes) {
      throw new AppError('Evento não encontrado.', 404);
    }

    return ParticipationTypes;
  }
}

export { FindParticipationTypeIndexService };
