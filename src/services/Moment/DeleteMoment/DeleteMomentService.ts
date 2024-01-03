import { inject, injectable } from 'tsyringe';
import { AppError } from '@utils/AppError';
import { IMomentRepository } from '@repositories/MomentRepository/IMomentRepository';
import { IParticipationRepository } from '@repositories/ParticipationRepository/IParticipationRepository';
import { IDeleteMomentDTO } from './IDeleteMomentServiceDTO';

@injectable()
class DeleteMomentService {
  constructor(
    @inject('MomentRepository')
    private momentRepository: IMomentRepository,

    @inject('ParticipationRepository')
    private participationRepository: IParticipationRepository,
  ) {}

  async execute({ moment_id, reqUser }: IDeleteMomentDTO): Promise<void> {
    const moment = await this.momentRepository.findById(moment_id);

    if (!moment) {
      throw new AppError('Momento não encontrado.', 404);
    }

    if (reqUser.id !== moment.event.author_id) {
      const hasAuth = await this.participationRepository.checkMod(
        reqUser.id,
        moment.event_id,
      );

      if (!hasAuth) {
        throw new AppError('Não autorizado.', 403);
      }
    }

    await this.momentRepository.remove(moment);
  }
}

export { DeleteMomentService };
