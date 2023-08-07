// import { Address } from '@entities/Address/Address';
// import { Permission } from '@entities/Permission/Permission';
import { inject, injectable } from 'tsyringe';
import { Meeting } from '@entities/Meeting/Meeting';
import { IHashProvider } from '@providers/HashProvider/IHashProvider';

import { IMeetingRepository } from '@repositories/MeetingRepository/IMeetingRepository';
import { AppError } from '@utils/AppError';
// import { v4 } from 'uuid';
import { IUpdateMeetingDTO } from './UpdateMeetingDTO';
// import { IRefreshTokenRepository } from '@repositories/RefreshTokenRepository/IRefreshTokenRepository';

@injectable()
class UpdateMeetingService {
  constructor(
    @inject('MeetingRepository')
    private MeetingRepository: IMeetingRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider, // @inject('RefreshTokenRepository') // private refreshTokenRepository: IRefreshTokenRepository,
  ) {}

  async execute({
    fields,
    // MeetingId,
    requestMeeting,
  }: IUpdateMeetingDTO): Promise<Meeting> {
    return;
    // const Meeting = await this.MeetingRepository.findById(MeetingId);
    // fields.document = fields.document?.replace(/\D/g, '');

    // if (!Meeting) {
    //   throw new AppError('Usuário não encontrado.', 404);
    // }

    // const hasPermission = requestMeeting.permissions.find(
    //   permission => permission === 5,
    // );

    // if (requestMeeting.role !== 'master' && !hasPermission) {
    //   throw new AppError('Usuário não encontrado.', 404);
    // }

    // if (fields.is_locator === false) Meeting.is_locator = false;
    // if (fields.is_locator === true) Meeting.is_locator = true;

    // if (fields.document) {
    //   const MeetingDocumentAlreadyExist = await this.MeetingRepository.findByDocument(
    //     fields.document as string,
    //   );
    //   if (
    //     MeetingDocumentAlreadyExist &&
    //     Meeting.document !== MeetingDocumentAlreadyExist.document
    //   ) {
    //     throw new AppError(
    //       'Já existe outro usuário cadastrado com esse documento.',
    //       404,
    //     );
    //   } else {
    //     Meeting.document = fields.document as string;
    //   }

    // if (fields.email) {
    //   const MeetingEmailAlreadyExist = await this.MeetingRepository.findByEmail(
    //     fields.email as string,
    //     Meeting.role_name,
    //   );
    //   if (MeetingEmailAlreadyExist && Meeting.email !== MeetingEmailAlreadyExist.email) {
    //     throw new AppError(
    //       'Já existe outro usuário cadastrado com esse email.',
    //       404,
    //     );
    //   } else {
    //     Meeting.email = fields.email as string;
    //   }
    // }
    // if (fields.name) {
    //   Meeting.name = fields.name;
    // }

    // if (fields.permissions) {
    //   if (
    //     requestMeeting.id !== Meeting.id_Meeting &&
    //     (hasPermission || requestMeeting.role === 'master')
    //   ) {
    //     const permissions = fields.permissions.map(permission => {
    //       const permissionInstance = new Permission();

    //       permissionInstance.id_permission = permission;

    //       return permissionInstance;
    //     });

    //     Meeting.permissions = permissions;
    //   }
    // }

    // if (Meeting.surname !== fields.surname) {
    //   Meeting.surname = fields.surname as string;
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
    //     Meeting.phone = cleanedPhone;
    //   } else throw new AppError('Telefone Possui um formato invalido');

    // }

    // if (fields.password) {
    //   const hashPassword = await this.hashProvider.generateHash(
    //     fields.password,
    //   );

    //   Meeting.password = hashPassword;

    //   await this.MeetingRepository.save(Meeting);

    //   await this.refreshTokenRepository.deleteByMeetingId(Meeting.id_Meeting);

    //   return Meeting;
    // }

    // if (fields.address) {
    //   const addressInstance = new Address();

    //   Object.assign(addressInstance, {
    //     id_address: Meeting.address?.id_address || v4(),
    //     ...fields.address,
    //   });

    //   Meeting.address = addressInstance;
    // }

    await this.MeetingRepository.save(Meeting);

    return Meeting;
  }
}

export { UpdateMeetingService };
