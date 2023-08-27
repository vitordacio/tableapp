import { IAddress } from '../../entities/Address/IAddress';
import { Address } from '../../entities/Address/Address';

export interface IAddressRepository {
  save(address: Address): Promise<Address>;
  create(data: IAddress): Address;
  findById(id: string): Promise<Address | undefined>;
  delete(id: string): Promise<void>;
  remove(entitie: Address): Promise<void>;
}
