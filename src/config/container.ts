import { container } from 'tsyringe';
import { IUserRepository } from '@repositories/UserRepository/IUserRepository';
import { UserRepository } from '@repositories/UserRepository/implementation/UserRepository';
import { IHashProvider } from '@providers/HashProvider/IHashProvider';
import { HashProvider } from '@providers/HashProvider/implementation/HashProvider';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);

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
