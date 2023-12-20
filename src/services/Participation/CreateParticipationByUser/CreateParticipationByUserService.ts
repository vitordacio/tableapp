import { inject, injectable } from 'tsyringe';
import { v4 } from 'uuid';

import { Participation } from '@entities/Participation/Participation';
import { IEventRepository } from '@repositories/EventRepository/IEventRepository';
import { IUserRepository } from '@repositories/UserRepository/IUserRepository';
import { IParticipationRepository } from '@repositories/ParticipationRepository/IParticipationRepository';

import { AppError } from '@utils/AppError';
import { INotificationRepository } from '@repositories/NotificationRepository/INotificationRepository';
import { IParticipationTypeRepository } from '@repositories/ParticipationTypeRepository/IParticipationTypeRepository';
import { ICreateParticipationByUserDTO } from './CreateParticipationByUserServiceDTO';

@injectable()
class CreateParticipationByUserService {
  constructor(
    @inject('EventRepository')
    private eventRepository: IEventRepository,

    @inject('ParticipationRepository')
    private participationRepository: IParticipationRepository,

    @inject('ParticipationTypeRepository')
    private participationTypeRepository: IParticipationTypeRepository,

    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('NotificationRepository')
    private notificationRepository: INotificationRepository,
  ) {}

  async execute({
    event_id,
    user,
  }: ICreateParticipationByUserDTO): Promise<Participation> {
    let participation: Participation | undefined;

    const [foundUser, event] = await Promise.all([
      await this.userRepository.findById(user.id),
      await this.eventRepository.findById(event_id),
    ]);

    // const foundUser = await this.userRepository.findById(user.id);

    if (!foundUser) {
      throw new AppError('Usuário não encontrado.', 404);
    }

    // const event = await this.eventRepository.findById(event_id);

    if (!event) {
      throw new AppError('Evento não encontrado.', 404);
    }

    if (user.id === event.author_id) {
      throw new AppError('Usuário já está participando.', 400);
    }

    participation = await this.participationRepository.findByUserAndEvent(
      user.id,
      event.id_event,
    );

    if (participation) {
      throw new AppError('Participação já cadastrada.', 400);
    }

    let participationType = await this.participationTypeRepository.findByName(
      'user',
    );

    if (!participationType) {
      participationType = this.participationTypeRepository.create({
        id: v4(),
        name: 'user',
      });

      await this.participationTypeRepository.save(participationType);
    }

    participation = this.participationRepository.create({
      id: v4(),
      type_id: participationType.id_participation_type,
      user_id: foundUser.id_user,
      event_id: event.id_event,
      confirmed_by_user: true,
    });

    const notification = this.notificationRepository.create({
      id: v4(),
      message: `${foundUser.name} quer participar de ${event.name}! 🎉`,
      type: 'participation',
      author_id: foundUser.id_user,
      user_id: event.author_id,
      participation_id: participation.id_participation,
    });

    await Promise.all([
      await this.participationRepository.save(participation),

      await this.notificationRepository.save(notification),
    ]);

    participation.participation_status = 'user_out';

    return participation;
  }
}

export { CreateParticipationByUserService };
