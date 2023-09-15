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
    user_id,
    lat,
    long,
    zip,
    street,
    uf,
    city,
    district,
    number,
  }: ICreateAddressPubDTO): Promise<Address> {
    let address: Address | undefined;
    const foundUser = await this.userRepository.findById(user_id);

    if (!foundUser) {
      throw new AppError('Usuário não encontrado.', 404);
    }

    if (foundUser.role_name !== 'pub') {
      throw new AppError('Usuário não tem permissão.', 404);
    }

    address = await this.addressRepository.findByCoordenates(lat, long);

    if (address?.user) {
      throw new AppError('Endereço já possui usuário cadastrado.', 400);
    }

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
    // address.user_id = foundUser.id_user;
    address.user = foundUser;

    // const addresses = foundUser.addresses || [];
    // foundUser.addresses = [...addresses, address];
    // await this.userRepository.save(foundUser);

    await this.addressRepository.save(address);

    return address;
  }
}

export { CreateAddressPubService };
