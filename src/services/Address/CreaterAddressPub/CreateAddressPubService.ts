import { inject, injectable } from 'tsyringe';
import { v4 } from 'uuid';

import { IUserRepository } from '@repositories/UserRepository/IUserRepository';
import { Address } from '@entities/Address/Address';

import { AppError } from '@utils/AppError';
import { IAddressRepository } from '@repositories/AddressRepository/IAddressRepository';
import { ICreateAddressPubDTO } from './CreateAddressPubServiceDTO';

@injectable()
class CreateAddressPubService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('AddressRepository')
    private addressRepository: IAddressRepository,
  ) {}

  async execute({
    zip,
    street,
    uf,
    city,
    district,
    number,
    lat,
    long,
    user,
  }: ICreateAddressPubDTO): Promise<Address> {
    const foundUser = await this.userRepository.findById(user.id);

    if (!foundUser) {
      throw new AppError('Usuário não encontrado.', 404);
    }

    const address = this.addressRepository.create({
      id: v4(),
      user: foundUser,
      zip,
      street,
      uf,
      city,
      district,
      number,
      lat,
      long,
    });

    await this.addressRepository.save(address);

    return address;
  }
}

export { CreateAddressPubService };
