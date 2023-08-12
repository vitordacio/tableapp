import { inject, injectable } from 'tsyringe';
import { v4 } from 'uuid';

import { Participation } from '@entities/Participation/Participation';
import { IEventRepository } from '@repositories/EventRepository/IEventRepository';
import { IUserRepository } from '@repositories/UserRepository/IUserRepository';
import { IParticipationRepository } from '@repositories/ParticipationRepository/IParticipationRepository';

import { AppError } from '@utils/AppError';
import { IParticipationTypeRepository } from '@repositories/ParticipationTypeRepository/IParticipationTypeRepository';
import { ICreateParticipationRequestDTO } from './CreateParticipationRequestServiceDTO';

@injectable()
class CreateParticipationRequestService {
  constructor(
    @inject('EventRepository')
    private eventRepository: IEventRepository,

    @inject('ParticipationRepository')
    private participationRepository: IParticipationRepository,

    @inject('ParticipationTypeRepository')
    private participationTypeRepository: IParticipationTypeRepository,

    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute({
    event_id,
    user,
  }: ICreateParticipationRequestDTO): Promise<Participation> {
    let participation: Participation | undefined;
    const foundUser = await this.userRepository.findById(user.id);

    if (!foundUser) {
      throw new AppError('Usuário não encontrado.', 404);
    }

    const event = await this.eventRepository.findById(event_id);

    if (!event) {
      throw new AppError('Evento não encontrado.', 404);
    }

    const participationType = await this.participationTypeRepository.findByType(
      'user',
    );

    if (!participationType) {
      throw new AppError('Tipo não encontrado.', 404);
    }

    participation = await this.participationRepository.findByUserAndEvent(
      user.id,
      event.id_event,
    );

    if (participation) {
      throw new AppError('Solicitação já enviada.', 404);
    }

    participation = this.participationRepository.create({
      id: v4(),
      event_id,
      type_id: participationType.id_participation_type,
      user_id: user.id,
    });

    await this.participationRepository.save(participation);

    return participation;
  }
}

export { CreateParticipationRequestService };
