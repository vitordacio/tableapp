import { container } from 'tsyringe';

import { IUserRepository } from '@repositories/UserRepository/IUserRepository';
import { UserRepository } from '@repositories/UserRepository/implementation/UserRepository';

import { IHashProvider } from '@providers/HashProvider/IHashProvider';
import { HashProvider } from '@providers/HashProvider/implementation/HashProvider';

import { IEventRepository } from '@repositories/EventRepository/IEventRepository';
import { EventRepository } from '@repositories/EventRepository/implementation/EventRepository';

import { IParticipationRepository } from '@repositories/ParticipationRepository/IParticipationRepository';
import { ParticipationRepository } from '@repositories/ParticipationRepository/implementation/ParticipationRepository';

import { IAddressRepository } from '@repositories/AddressRepository/IAddressRepository';
import { AddressRepository } from '@repositories/AddressRepository/implementation/AddressRepository';

import { IFriendshipRepository } from '@repositories/FriendshipRepository/IFriendshipRepository';
import { FriendshipRepository } from '@repositories/FriendshipRepository/implementation/FriendshipRepository';
import { INotificationRepository } from '@repositories/NotificationRepository/INotificationRepository';
import { NotificationRepository } from '@repositories/NotificationRepository/implementation/NotificationRepository';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
container.registerSingleton<IEventRepository>(
  'EventRepository',
  EventRepository,
);

container.registerSingleton<IParticipationRepository>(
  'ParticipationRepository',
  ParticipationRepository,
);

container.registerSingleton<IAddressRepository>(
  'AddressRepository',
  AddressRepository,
);

container.registerSingleton<IHashProvider>('HashProvider', HashProvider);

container.registerSingleton<IFriendshipRepository>(
  'FriendshipRepository',
  FriendshipRepository,
);

container.registerSingleton<INotificationRepository>(
  'NotificationRepository',
  NotificationRepository,
);
