import { inject, injectable } from 'tsyringe';
import { v4 } from 'uuid';
import { ParticipationType } from '@entities/ParticipationType/ParticipationType';
import { AppError } from '@utils/AppError';
import { IParticipationTypeRepository } from '@repositories/ParticipationTypeRepository/IParticipationTypeRepository';
import { ICreateParticipationTypeDTO } from './ICreateParticipationTypeServiceDTO';

@injectable()
class CreateParticipationTypeService {
  constructor(
    @inject('ParticipationTypeRepository')
    private participationTypeRepository: IParticipationTypeRepository,
  ) {}

  async execute({
    name,
  }: ICreateParticipationTypeDTO): Promise<ParticipationType> {
    const type = await this.participationTypeRepository.findByName(name);

    if (type) {
      throw new AppError('Tipo de participação já cadastrada.', 400);
    }

    const participationType = this.participationTypeRepository.create({
      id: v4(),
      name,
    });

    await this.participationTypeRepository.save(participationType);

    return participationType;
  }
}

export { CreateParticipationTypeService };
