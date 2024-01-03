import { inject, injectable } from 'tsyringe';
import { AppError } from '@utils/AppError';
import { IMomentRepository } from '@repositories/MomentRepository/IMomentRepository';
import { IParticipationRepository } from '@repositories/ParticipationRepository/IParticipationRepository';
import { Moment } from '@entities/Moment/Moment';
import { IUpdateMomentDTO } from './IUpdateMomentServiceDTO';

@injectable()
class UpdateMomentService {
  constructor(
    @inject('MomentRepository')
    private momentRepository: IMomentRepository,

    @inject('ParticipationRepository')
    private participationRepository: IParticipationRepository,
  ) {}

  async execute({
    moment_id,
    title,
    description,
    reqUser,
  }: IUpdateMomentDTO): Promise<Moment> {
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

    if (title) moment.title = title;
    if (description) moment.description = description;

    await this.momentRepository.save(moment);

    return moment;
  }
}

export { UpdateMomentService };
