// import { Brackets, getRepository, Repository } from 'typeorm';
import { getRepository, Repository } from 'typeorm';
import { IAddress } from '@entities/Address/IAddress';
import { Address } from '@entities/Address/Address';
import { IAddressRepository } from '../IAddressRepository';

class AddressRepository implements IAddressRepository {
  private ormRepository: Repository<Address>;

  constructor() {
    this.ormRepository = getRepository(Address);
  }

  create(data: IAddress): Address {
    const address = this.ormRepository.create({
      id_address: data.id,
      lat: data.lat,
      long: data.long,
      user_id: data.user_id,
      zip: data.zip,
      street: data.street,
      uf: data.uf,
      city: data.city,
      district: data.district,
      number: data.number,
    });

    return address;
  }

  async save(address: Address): Promise<Address> {
    const newAddress = await this.ormRepository.save(address);

    return newAddress;
  }

  async findIndex(): Promise<Address[]> {
    const addresses = await this.ormRepository.find({
      relations: ['user', 'events'],
    });

    return addresses;
  }

  async findById(id: string): Promise<Address | undefined> {
    const address = await this.ormRepository.findOne({
      relations: ['user', 'events'],
      where: { id_address: id },
    });

    return address;
  }

  async findByCoordenates(
    lat: number,
    long: number,
  ): Promise<Address | undefined> {
    const address = await this.ormRepository.findOne({
      relations: ['user', 'events'],
      where: { lat, long },
    });

    return address;
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  async remove(entitie: Address): Promise<void> {
    await this.ormRepository.softRemove(entitie);
  }
}

export { AddressRepository };
