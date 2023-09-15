import { inject, injectable } from 'tsyringe';

import { v4 } from 'uuid';
import { Address } from '@entities/Address/Address';

import { AppError } from '@utils/AppError';
import { IAddressRepository } from '@repositories/AddressRepository/IAddressRepository';
import { IEventRepository } from '@repositories/EventRepository/IEventRepository';
import { IUserRepository } from '@repositories/UserRepository/IUserRepository';
import { hasModPermission } from '@utils/validations';
import { ICreateAddressEventDTO } from './CreateAddressEventServiceDTO';

@injectable()
class CreateAddressEventService {
  constructor(
    @inject('EventRepository')
    private eventRepository: IEventRepository,

    @inject('AddressRepository')
    private addressRepository: IAddressRepository,

    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute({
    event_id,
    user,
    zip,
    street,
    uf,
    city,
    district,
    number,
    lat,
    long,
  }: ICreateAddressEventDTO): Promise<Address> {
    let address: Address | undefined;
    const foundUser = await this.userRepository.findById(user.id);

    if (!foundUser) {
      throw new AppError('Usuário não encontrado.', 404);
    }

    const event = await this.eventRepository.findById(event_id);

    if (!event) {
      throw new AppError('Evento não encontrado.', 404);
    }

    if (user.id !== event.owner_id) {
      const auth = hasModPermission(user.id, event.participations);

      if (!auth) {
        throw new AppError('Não autorizado.', 403);
      }
    }

    address = await this.addressRepository.findByCoordenates(lat, long);

    if (!address) {
      address = this.addressRepository.create({
        id: v4(),
        zip,
        street,
        uf,
        city,
        district,
        number,
        lat,
        long,
      });
    }

    const events = address.events || [];
    address.events = [...events, event];

    await this.addressRepository.save(address);

    address.events = address.events.filter(
      alreadyEvent => alreadyEvent.id_event === event.id_event,
    );

    return address;
  }
}

export { CreateAddressEventService };
