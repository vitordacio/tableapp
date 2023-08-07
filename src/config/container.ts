import { container } from 'tsyringe';

import { IUserRepository } from '@repositories/UserRepository/IUserRepository';
import { UserRepository } from '@repositories/UserRepository/implementation/UserRepository';

import { IHashProvider } from '@providers/HashProvider/IHashProvider';
import { HashProvider } from '@providers/HashProvider/implementation/HashProvider';

import { IMeetingRepository } from '@repositories/MeetingRepository/IMeetingRepository';
import { MeetingRepository } from '@repositories/MeetingRepository/implementation/MeetingRepository';

import { IMeetingTypeRepository } from '@repositories/MeetingTypeRepository/IMeetingTypeRepository';
import { MeetingTypeRepository } from '@repositories/MeetingTypeRepository/implementation/MeetingTypeRepository';

import { IParticipationRepository } from '@repositories/ParticipationRepository/IParticipationRepository';
import { ParticipationRepository } from '@repositories/ParticipationRepository/implementation/ParticipationRepository';

import { IParticipationTypeRepository } from '@repositories/ParticipationTypeRepository/IParticipationTypeRepository';
import { ParticipationTypeRepository } from '@repositories/ParticipationTypeRepository/implementation/ParticipationTypeRepository';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
container.registerSingleton<IMeetingRepository>(
  'MeetingRepository',
  MeetingRepository,
);
container.registerSingleton<IMeetingTypeRepository>(
  'MeetingTypeRepository',
  MeetingTypeRepository,
);

container.registerSingleton<IParticipationRepository>(
  'ParticipationRepository',
  ParticipationRepository,
);

container.registerSingleton<IParticipationTypeRepository>(
  'ParticipationTypeRepository',
  ParticipationTypeRepository,
);

// container.registerSingleton<IAddressRepository>(
//   'AddressRepository',
//   AddressRepository,
// );

container.registerSingleton<IHashProvider>('HashProvider', HashProvider);

// container.registerSingleton<IRoleRepository>('RoleRepository', RoleRepository);

// container.registerSingleton<IMailProvider>('MailProvider', MailProvider);

// container.registerSingleton<INotificationRepository>(
//   'NotificationRepository',
//   NotificationRepository,
// );

// container.registerSingleton<IAssessmentRepository>(
//   'AssessmentRepository',
//   AssessmentRepository,
// );

// container.registerSingleton<IImageRepository>(
//   'ImageRepository',
//   ImageRepository,
// );

// container.registerSingleton<IBannerRepository>(
//   'BannerRepository',
//   BannerRepository,
// );

// container.registerSingleton<IPubRepository>('PubRepository', PubRepository);
