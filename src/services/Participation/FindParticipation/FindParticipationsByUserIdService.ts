import { inject, injectable } from 'tsyringe';
import { Participation } from '@entities/Participation/Participation';
import { IParticipationRepository } from '@repositories/ParticipationRepository/IParticipationRepository';
import { IFindByUserIdDTO } from './IFindParticipationsDTO';

@injectable()
class FindParticipationsByUserIdService {
  constructor(
    @inject('ParticipationRepository')
    private participationRepository: IParticipationRepository,
  ) {}

  async execute({
    user_id,
    limit,
    page,
  }: IFindByUserIdDTO): Promise<Participation[]> {
    const participations = await this.participationRepository.findByUserId(
      user_id,
      page || 1,
      limit || 20,
    );

    return participations;
  }
}

export { FindParticipationsByUserIdService };
