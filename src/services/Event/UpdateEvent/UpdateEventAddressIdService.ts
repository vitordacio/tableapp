import { inject, injectable } from 'tsyringe';
import { AppError } from '@utils/AppError';
import { IEventRepository } from '@repositories/EventRepository/IEventRepository';
import { IParticipationRepository } from '@repositories/ParticipationRepository/IParticipationRepository';
import { IAddressRepository } from '@repositories/AddressRepository/IAddressRepository';
import { Event } from '@entities/Event/Event';
import { IUpdateEventAddressIdDTO } from './UpdateEventDTO';

@injectable()
class UpdateEventAddressIdService {
  constructor(
    @inject('EventRepository')
    private eventRepository: IEventRepository,

    @inject('ParticipationRepository')
    private participationRepository: IParticipationRepository,

    @inject('AddressRepository')
    private addressRepository: IAddressRepository,
  ) {}

  async execute({
    user,
    event_id,
    address_id,
  }: IUpdateEventAddressIdDTO): Promise<Event> {
    const [event, address] = await Promise.all([
      this.eventRepository.findById(event_id),
      this.addressRepository.findById(address_id),
    ]);

    // const event = await this.eventRepository.findById(event_id);

    if (!event) {
      throw new AppError('Evento não encontrado.', 404);
    }

    if (!address) {
      throw new AppError('Endereço não encontrado.', 404);
    }

    if (user.id !== event.author_id) {
      const auth = await this.participationRepository.checkMod(
        user.id,
        event_id,
      );

      if (!auth) {
        throw new AppError('Não autorizado.', 403);
      }
    }

    event.address_id = address_id;

    await this.eventRepository.save(event);

    return event;
  }
}

export { UpdateEventAddressIdService };
