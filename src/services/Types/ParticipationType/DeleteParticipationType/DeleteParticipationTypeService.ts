import { inject, injectable } from 'tsyringe';
import { AppError } from '@utils/AppError';
import { IParticipationTypeRepository } from '@repositories/ParticipationTypeRepository/IParticipationTypeRepository';

@injectable()
class DeleteParticipationTypeService {
  constructor(
    @inject('ParticipationTypeRepository')
    private participationTypeRepository: IParticipationTypeRepository,
  ) {}

  async execute(type_id: string): Promise<void> {
    const participationType = await this.participationTypeRepository.findById(
      type_id,
    );

    if (!participationType) {
      throw new AppError('Tipo de participação não encontrada.', 404);
    }

    await this.participationTypeRepository.remove(participationType);
  }
}

export { DeleteParticipationTypeService };
