import { inject, injectable } from 'tsyringe';

import { Address } from '@entities/Address/Address';

import { IAddressRepository } from '@repositories/AddressRepository/IAddressRepository';

@injectable()
class FindAddressIndexService {
  constructor(
    @inject('AddressRepository')
    private addressRepository: IAddressRepository,
  ) {}

  async execute(): Promise<Address[]> {
    const addresses = await this.addressRepository.findIndex();

    return addresses;
  }
}

export { FindAddressIndexService };
