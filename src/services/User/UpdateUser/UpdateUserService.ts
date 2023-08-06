// import { Address } from '@entities/Address/Address';
// import { Permission } from '@entities/Permission/Permission';
import { inject, injectable } from 'tsyringe';
import { User } from '@entities/User/User';
import { IHashProvider } from '@providers/HashProvider/IHashProvider';

import { IUserRepository } from '@repositories/UserRepository/IUserRepository';
import { AppError } from '@utils/AppError';
// import { v4 } from 'uuid';
import { IUpdateUserDTO } from './UpdateUserDTO';
// import { IRefreshTokenRepository } from '@repositories/RefreshTokenRepository/IRefreshTokenRepository';

@injectable()
class UpdateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider, // @inject('RefreshTokenRepository') // private refreshTokenRepository: IRefreshTokenRepository,
  ) {}

  async execute({
    fields,
    // userId,
    requestUser,
  }: IUpdateUserDTO): Promise<User> {
    return;
    // const user = await this.userRepository.findById(userId);
    // fields.document = fields.document?.replace(/\D/g, '');

    // if (!user) {
    //   throw new AppError('Usuário não encontrado.', 404);
    // }

    // const hasPermission = requestUser.permissions.find(
    //   permission => permission === 5,
    // );

    // if (requestUser.role !== 'master' && !hasPermission) {
    //   throw new AppError('Usuário não encontrado.', 404);
    // }

    // if (fields.is_locator === false) user.is_locator = false;
    // if (fields.is_locator === true) user.is_locator = true;

    // if (fields.document) {
    //   const userDocumentAlreadyExist = await this.userRepository.findByDocument(
    //     fields.document as string,
    //   );
    //   if (
    //     userDocumentAlreadyExist &&
    //     user.document !== userDocumentAlreadyExist.document
    //   ) {
    //     throw new AppError(
    //       'Já existe outro usuário cadastrado com esse documento.',
    //       404,
    //     );
    //   } else {
    //     user.document = fields.document as string;
    //   }

    // if (fields.email) {
    //   const userEmailAlreadyExist = await this.userRepository.findByEmail(
    //     fields.email as string,
    //     user.role_name,
    //   );
    //   if (userEmailAlreadyExist && user.email !== userEmailAlreadyExist.email) {
    //     throw new AppError(
    //       'Já existe outro usuário cadastrado com esse email.',
    //       404,
    //     );
    //   } else {
    //     user.email = fields.email as string;
    //   }
    // }
    // if (fields.name) {
    //   user.name = fields.name;
    // }

    // if (fields.permissions) {
    //   if (
    //     requestUser.id !== user.id_user &&
    //     (hasPermission || requestUser.role === 'master')
    //   ) {
    //     const permissions = fields.permissions.map(permission => {
    //       const permissionInstance = new Permission();

    //       permissionInstance.id_permission = permission;

    //       return permissionInstance;
    //     });

    //     user.permissions = permissions;
    //   }
    // }

    // if (user.surname !== fields.surname) {
    //   user.surname = fields.surname as string;
    // }

    // if (fields.phone) {
    //   let cleanedPhone = fields.phone?.replace(/\D/g, '');
    //   cleanedPhone = cleanedPhone as string;
    //   if (cleanedPhone?.startsWith('55')) cleanedPhone = cleanedPhone.slice(2);

    //   if (cleanedPhone.length < 11 || cleanedPhone[2] !== '9') {
    //     cleanedPhone = `${cleanedPhone.substring(
    //       0,
    //       2,
    //     )}9${cleanedPhone.substring(2)}`;
    //   }

    //   if (cleanedPhone.length === 11) {
    //     cleanedPhone = `+55${cleanedPhone}`;
    //     user.phone = cleanedPhone;
    //   } else throw new AppError('Telefone Possui um formato invalido');

    // }

    // if (fields.password) {
    //   const hashPassword = await this.hashProvider.generateHash(
    //     fields.password,
    //   );

    //   user.password = hashPassword;

    //   await this.userRepository.save(user);

    //   await this.refreshTokenRepository.deleteByUserId(user.id_user);

    //   return user;
    // }

    // if (fields.address) {
    //   const addressInstance = new Address();

    //   Object.assign(addressInstance, {
    //     id_address: user.address?.id_address || v4(),
    //     ...fields.address,
    //   });

    //   user.address = addressInstance;
    // }

    await this.userRepository.save(user);

    return user;
  }
}

export { UpdateUserService };
