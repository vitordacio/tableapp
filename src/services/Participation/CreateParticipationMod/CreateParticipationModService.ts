import { inject, injectable } from 'tsyringe';
import { v4 } from 'uuid';

import { Participation } from '@entities/Participation/Participation';
import { IEventRepository } from '@repositories/EventRepository/IEventRepository';
import { IUserRepository } from '@repositories/UserRepository/IUserRepository';
import { IParticipationRepository } from '@repositories/ParticipationRepository/IParticipationRepository';

import { AppError } from '@utils/AppError';
import { IParticipationTypeRepository } from '@repositories/ParticipationTypeRepository/IParticipationTypeRepository';
import { ICreateParticipationModDTO } from './CreateParticipationModServiceDTO';

@injectable()
class CreateParticipationModService {
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
    user_id,
    user,
  }: ICreateParticipationModDTO): Promise<Participation> {
    let participation: Participation | undefined;

    const event = await this.eventRepository.findById(event_id);

    if (!event) {
      throw new AppError('Evento não encontrado.', 404);
    }

    if (event.owner_id !== user.id) {
      throw new AppError('Não autorizado.', 403);
    }

    const foundUser = await this.userRepository.findById(user_id);

    if (!foundUser) {
      throw new AppError('Usuário não encontrado.', 404);
    }

    const modType = await this.participationTypeRepository.findByType('mod');

    if (!modType) {
      throw new AppError('Tipo não encontrado.', 404);
    }

    participation = await this.participationRepository.findByUserAndEvent(
      user_id,
      event.id_event,
    );

    if (
      participation?.type_id === modType.id_participation_type ||
      user.id === user_id
    ) {
      throw new AppError('Usuário já é moderador.', 400);
    }

    if (!participation) {
      participation = this.participationRepository.create({
        id: v4(),
        event_id,
        type_id: modType.id_participation_type,
        user_id,
      });
    } else {
      participation.type_id = modType.id_participation_type;
    }

    participation.reviwed = true;

    await this.participationRepository.save(participation);

    return participation;
  }
}

export { CreateParticipationModService };
