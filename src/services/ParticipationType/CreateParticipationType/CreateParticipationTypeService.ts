import { inject, injectable } from 'tsyringe';
import { v4 } from 'uuid';

import { ParticipationType } from '@entities/ParticipationType/ParticipationType';
import { IParticipationTypeRepository } from '@repositories/ParticipationTypeRepository/IParticipationTypeRepository';
import { AppError } from '@utils/AppError';
import { ICreateParticipationTypeDTO } from './CreateParticipationTypeServiceDTO';

@injectable()
class CreateParticipationTypeService {
  constructor(
    @inject('ParticipationTypeRepository')
    private participationTypeRepository: IParticipationTypeRepository,
  ) {}

  async execute({
    type,
    type_name,
  }: ICreateParticipationTypeDTO): Promise<ParticipationType> {
    const foundParticipationType =
      await this.participationTypeRepository.findByType(type);

    if (foundParticipationType) {
      throw new AppError('Tipo já cadastrado.', 400);
    }

    const participationType = this.participationTypeRepository.create({
      id: v4(),
      type,
      type_name,
    });

    await this.participationTypeRepository.save(participationType);

    return participationType;
  }
}

export { CreateParticipationTypeService };
