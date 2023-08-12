// import { Address } from '@entities/Address/Address';
// import { Permission } from '@entities/Permission/Permission';
import { inject, injectable } from 'tsyringe';
import { Table } from '@entities/Table/Table';
import { IHashProvider } from '@providers/HashProvider/IHashProvider';

import { ITableRepository } from '@repositories/TableRepository/ITableRepository';
import { AppError } from '@utils/AppError';
// import { v4 } from 'uuid';
import { IUpdateTableDTO } from './UpdateTableDTO';
// import { IRefreshTokenRepository } from '@repositories/RefreshTokenRepository/IRefreshTokenRepository';

@injectable()
class UpdateTableService {
  constructor(
    @inject('TableRepository')
    private TableRepository: ITableRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider, // @inject('RefreshTokenRepository') // private refreshTokenRepository: IRefreshTokenRepository,
  ) {}

  async execute({
    fields,
    // TableId,
    requestTable,
  }: IUpdateTableDTO): Promise<Table> {
    return;
    // const Table = await this.TableRepository.findById(TableId);
    // fields.document = fields.document?.replace(/\D/g, '');

    // if (!Table) {
    //   throw new AppError('Usuário não encontrado.', 404);
    // }

    // const hasPermission = requestTable.permissions.find(
    //   permission => permission === 5,
    // );

    // if (requestTable.role !== 'master' && !hasPermission) {
    //   throw new AppError('Usuário não encontrado.', 404);
    // }

    // if (fields.is_locator === false) Table.is_locator = false;
    // if (fields.is_locator === true) Table.is_locator = true;

    // if (fields.document) {
    //   const TableDocumentAlreadyExist = await this.TableRepository.findByDocument(
    //     fields.document as string,
    //   );
    //   if (
    //     TableDocumentAlreadyExist &&
    //     Table.document !== TableDocumentAlreadyExist.document
    //   ) {
    //     throw new AppError(
    //       'Já existe outro usuário cadastrado com esse documento.',
    //       404,
    //     );
    //   } else {
    //     Table.document = fields.document as string;
    //   }

    // if (fields.email) {
    //   const TableEmailAlreadyExist = await this.TableRepository.findByEmail(
    //     fields.email as string,
    //     Table.role_name,
    //   );
    //   if (TableEmailAlreadyExist && Table.email !== TableEmailAlreadyExist.email) {
    //     throw new AppError(
    //       'Já existe outro usuário cadastrado com esse email.',
    //       404,
    //     );
    //   } else {
    //     Table.email = fields.email as string;
    //   }
    // }
    // if (fields.name) {
    //   Table.name = fields.name;
    // }

    // if (fields.permissions) {
    //   if (
    //     requestTable.id !== Table.id_Table &&
    //     (hasPermission || requestTable.role === 'master')
    //   ) {
    //     const permissions = fields.permissions.map(permission => {
    //       const permissionInstance = new Permission();

    //       permissionInstance.id_permission = permission;

    //       return permissionInstance;
    //     });

    //     Table.permissions = permissions;
    //   }
    // }

    // if (Table.surname !== fields.surname) {
    //   Table.surname = fields.surname as string;
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
    //     Table.phone = cleanedPhone;
    //   } else throw new AppError('Telefone Possui um formato invalido');

    // }

    // if (fields.password) {
    //   const hashPassword = await this.hashProvider.generateHash(
    //     fields.password,
    //   );

    //   Table.password = hashPassword;

    //   await this.TableRepository.save(Table);

    //   await this.refreshTokenRepository.deleteByTableId(Table.id_Table);

    //   return Table;
    // }

    // if (fields.address) {
    //   const addressInstance = new Address();

    //   Object.assign(addressInstance, {
    //     id_address: Table.address?.id_address || v4(),
    //     ...fields.address,
    //   });

    //   Table.address = addressInstance;
    // }

    await this.TableRepository.save(Table);

    return Table;
  }
}

export { UpdateTableService };
