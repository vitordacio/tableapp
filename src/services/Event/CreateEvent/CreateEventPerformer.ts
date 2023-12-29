import { inject, injectable } from 'tsyringe';
import { v4 } from 'uuid';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { Event } from '@entities/Event/Event';
import { IUserRepository } from '@repositories/UserRepository/IUserRepository';
import { AppError } from '@utils/AppError';
import { IEventRepository } from '@repositories/EventRepository/IEventRepository';
import { IParticipationRepository } from '@repositories/ParticipationRepository/IParticipationRepository';
import { IPerformerRepository } from '@repositories/PerformerRepository/IPerformerRepository';
import { User } from '@entities/User/User';
import { ICreateEventPerformerDTO } from './ICreateEventServiceDTO';

dayjs.extend(utc);

@injectable()
class CreateEventPerformerService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('EventRepository')
    private eventRepository: IEventRepository,

    @inject('PerformerRepository')
    private performerRepository: IPerformerRepository,

    @inject('ParticipationRepository')
    private participationRepository: IParticipationRepository,
  ) {}

  async execute({
    event_id,
    name,
    user_id,
    reqUser,
  }: ICreateEventPerformerDTO): Promise<Event> {
    let user: User | undefined;
    if (!name && !user_id) {
      throw new AppError('Informe um nome ou usuário', 400);
    }

    const [requester, event] = await Promise.all([
      this.userRepository.findById(reqUser.id),
      this.eventRepository.findById(event_id),
    ]);

    if (!requester) {
      throw new AppError(
        'Token expirado, por favor realize o login novamente.',
        400,
      );
    }

    if (!event) {
      throw new AppError('Evento não encontrado.', 404);
    }

    if (reqUser.id !== event.author_id) {
      const auth = await this.participationRepository.checkMod(
        reqUser.id,
        event_id,
      );

      if (!auth) {
        throw new AppError('Não autorizado.', 403);
      }
    }

    if (user_id) {
      const alreadyExists = event.performers.some(
        performer => performer.user_id === user_id,
      );

      if (alreadyExists) {
        throw new AppError('Artista já cadastrado.', 400);
      }

      user = await this.userRepository.findById(user_id);

      if (!user) {
        throw new AppError('Artista não encontrado.', 404);
      }
    }

    const performer = this.performerRepository.create({
      id: v4(),
      name,
      event_id,
      user_id,
    });

    await this.performerRepository.save(performer);

    event.performers = [...event.performers, performer];

    return event;
  }
}

export { CreateEventPerformerService };
