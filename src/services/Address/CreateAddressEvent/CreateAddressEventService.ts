import { inject, injectable } from 'tsyringe';

import { v4 } from 'uuid';
import { Address } from '@entities/Address/Address';

import { AppError } from '@utils/AppError';
import { IAddressRepository } from '@repositories/AddressRepository/IAddressRepository';
import { IEventRepository } from '@repositories/EventRepository/IEventRepository';
import { IUserRepository } from '@repositories/UserRepository/IUserRepository';
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
    const foundUser = await this.userRepository.findById(user.id);

    if (!foundUser) {
      throw new AppError('Usuário não encontrado.', 404);
    }

    const event = await this.eventRepository.findById(event_id);

    if (!event) {
      throw new AppError('Evento não encontrado.', 404);
    }

    if (foundUser.id_user !== event.owner_id) {
      throw new AppError('Não autorizado.', 403);
    }

    const address = this.addressRepository.create({
      id: v4(),
      event,
      zip,
      street,
      uf,
      city,
      district,
      number,
      lat,
      long,
    });

    return address;
  }
}

export { CreateAddressEventService };
