import { inject, injectable } from 'tsyringe';
import { v4 } from 'uuid';
import participationType from '@config/fetch/participationType';
import { ParticipationType } from '@entities/ParticipationType/ParticipationType';
import { IParticipationTypeRepository } from '@repositories/ParticipationTypeRepository/IParticipationTypeRepository';

@injectable()
class FetchParticipationTypesService {
  constructor(
    @inject('ParticipationTypeRepository')
    private participationTypeRepository: IParticipationTypeRepository,
  ) {}

  async execute(): Promise<ParticipationType[]> {
    const newTypes: ParticipationType[] = [];

    const types = await this.participationTypeRepository.findIndex();

    participationType.forEach(data => {
      const alreadyExists = types.some(type => type.name === data.name);

      if (alreadyExists) return;

      const newType = this.participationTypeRepository.create({
        id: v4(),
        name: data.name,
      });

      newTypes.push(newType);
    });

    await this.participationTypeRepository.saveMany(newTypes);

    return newTypes;
  }
}

export { FetchParticipationTypesService };
