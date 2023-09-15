import { IAddress } from '../../entities/Address/IAddress';
import { Address } from '../../entities/Address/Address';

export interface IAddressRepository {
  save(address: Address): Promise<Address>;
  create(data: IAddress): Address;
  findIndex(): Promise<Address[]>;
  findById(id: string): Promise<Address | undefined>;
  findByCoordenates(lat: number, long: number): Promise<Address | undefined>;
  delete(id: string): Promise<void>;
  remove(entitie: Address): Promise<void>;
}
