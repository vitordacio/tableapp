import { inject, injectable } from 'tsyringe';

import { v4 } from 'uuid';
import { Moment } from '@entities/Moment/Moment';
import { AppError } from '@utils/AppError';
import { IUserRepository } from '@repositories/UserRepository/IUserRepository';
import { IEventRepository } from '@repositories/EventRepository/IEventRepository';
import { IMomentRepository } from '@repositories/MomentRepository/IMomentRepository';
import { IParticipationRepository } from '@repositories/ParticipationRepository/IParticipationRepository';
import { ICreateMomentDTO } from './ICreateMomentServiceDTO';

@injectable()
class CreateMomentService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('EventRepository')
    private eventRepository: IEventRepository,

    @inject('MomentRepository')
    private momentRepository: IMomentRepository,

    @inject('ParticipationRepository')
    private participationRepository: IParticipationRepository,
  ) {}

  async execute({
    event_id,
    title,
    description,
    reqUser,
  }: ICreateMomentDTO): Promise<Moment> {
    const [author, event] = await Promise.all([
      this.userRepository.findById(reqUser.id),
      this.eventRepository.findById(event_id),
    ]);

    if (!author) {
      throw new AppError(
        'Token expirado, por favor realize o login novamente.',
        400,
      );
    }

    if (!event) {
      throw new AppError('Evento não encontrado.', 404);
    }

    if (author.id_user !== event.author_id) {
      const hasAuth = await this.participationRepository.checkMod(
        author.id_user,
        event.id_event,
      );

      if (!hasAuth) {
        throw new AppError('Não autorizado.', 403);
      }
    }

    const moment = this.momentRepository.create({
      id: v4(),
      author_id: author.id_user,
      event_id: event.id_event,
      img_url: '',
      thumb_url: '',
      title,
      description,
    });

    await this.momentRepository.save(moment);

    return moment;
  }
}

export { CreateMomentService };
