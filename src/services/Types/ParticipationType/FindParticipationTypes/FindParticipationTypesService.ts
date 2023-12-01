import { inject, injectable } from 'tsyringe';
import { ParticipationType } from '@entities/ParticipationType/ParticipationType';
import { IParticipationTypeRepository } from '@repositories/ParticipationTypeRepository/IParticipationTypeRepository';

@injectable()
class FindParticipationTypesService {
  constructor(
    @inject('ParticipationTypeRepository')
    private participationTypeRepository: IParticipationTypeRepository,
  ) {}

  async execute(): Promise<ParticipationType[]> {
    const types = await this.participationTypeRepository.findIndex();

    return types;
  }
}

export { FindParticipationTypesService };
