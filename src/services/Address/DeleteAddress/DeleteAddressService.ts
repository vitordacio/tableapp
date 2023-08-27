import { inject, injectable } from 'tsyringe';

import { AppError } from '@utils/AppError';
import { IAddressRepository } from '@repositories/AddressRepository/IAddressRepository';

@injectable()
class DeleteAddressService {
  constructor(
    @inject('AddressRepository')
    private addressRepository: IAddressRepository,
  ) {}

  async execute(
    address_id: string,
    user: AuthorizedUser<UserPerm | PubPerm>,
  ): Promise<void> {
    const address = await this.addressRepository.findById(address_id);

    if (!address) {
      throw new AppError('Endereço não encontrado.', 404);
    }

    if (user.id !== address.user_id) {
      throw new AppError('Não autorizado.', 403);
    }

    await this.addressRepository.remove(address);
  }
}

export { DeleteAddressService };
