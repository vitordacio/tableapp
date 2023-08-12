import { inject, injectable } from 'tsyringe';

import { Participation } from '@entities/Participation/Participation';

import { IParticipationRepository } from '@repositories/ParticipationRepository/IParticipationRepository';

import { AppError } from '@utils/AppError';
import { ICreateParticipationResponseDTO } from './CreateParticipationResponseServiceDTO';

@injectable()
class CreateParticipationResponseService {
  constructor(
    @inject('ParticipationRepository')
    private participationRepository: IParticipationRepository,
  ) {}

  async execute({
    participation_id,
    user,
  }: ICreateParticipationResponseDTO): Promise<Participation> {
    const participation = await this.participationRepository.findById(
      participation_id,
    );

    if (!participation) {
      throw new AppError('Solicitação não encontrada.', 404);
    }

    if (participation.event.owner_id !== user.id) {
      const auth = await this.participationRepository.findMod(
        user.id,
        participation.event.id_event,
      );

      if (!auth) {
        throw new AppError('Não autorizado.', 403);
      }
    }

    participation.confirmed = true;
    participation.reviwed = true;
    await this.participationRepository.save(participation);

    // mandar notificaçao

    return participation;
  }
}

export { CreateParticipationResponseService };
