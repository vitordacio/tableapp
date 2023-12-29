import { container } from 'tsyringe';

import { IUserRepository } from '@repositories/UserRepository/IUserRepository';
import { UserRepository } from '@repositories/UserRepository/implementation/UserRepository';

import { IUserUpdateRepository } from '@repositories/UserUpdateRepository/IUserUpdateRepository';
import { UserUpdateRepository } from '@repositories/UserUpdateRepository/implementation/UserUpdateRepository';

import { IHashProvider } from '@providers/HashProvider/IHashProvider';
import { HashProvider } from '@providers/HashProvider/implementation/HashProvider';

import { IEventRepository } from '@repositories/EventRepository/IEventRepository';
import { EventRepository } from '@repositories/EventRepository/implementation/EventRepository';

import { IEventTypeRepository } from '@repositories/EventTypeRepository/IEventTypeRepository';
import { EventTypeRepository } from '@repositories/EventTypeRepository/implementation/EventTypeRepository';

import { IEmojiRepository } from '@repositories/EmojiRepository/IEmojiRepository';
import { EmojiRepository } from '@repositories/EmojiRepository/implementation/EmojiRepository';

import { IEmojiTypeRepository } from '@repositories/EmojiTypeRepository/IEmojiTypeRepository';
import { EmojiTypeRepository } from '@repositories/EmojiTypeRepository/implementation/EmojiTypeRepository';

import { IReactRepository } from '@repositories/ReactRepository/IReactRepository';
import { ReactRepository } from '@repositories/ReactRepository/implementation/ReactRepository';

import { IReportRepository } from '@repositories/ReportRepository/IReportRepository';
import { ReportRepository } from '@repositories/ReportRepository/implementation/ReportRepository';

import { IParticipationRepository } from '@repositories/ParticipationRepository/IParticipationRepository';
import { ParticipationRepository } from '@repositories/ParticipationRepository/implementation/ParticipationRepository';

import { IParticipationTypeRepository } from '@repositories/ParticipationTypeRepository/IParticipationTypeRepository';
import { ParticipationTypeRepository } from '@repositories/ParticipationTypeRepository/implementation/ParticipationTypeRepository';

import { IAddressRepository } from '@repositories/AddressRepository/IAddressRepository';
import { AddressRepository } from '@repositories/AddressRepository/implementation/AddressRepository';

import { IFriendshipRepository } from '@repositories/FriendshipRepository/IFriendshipRepository';
import { FriendshipRepository } from '@repositories/FriendshipRepository/implementation/FriendshipRepository';

import { INotificationRepository } from '@repositories/NotificationRepository/INotificationRepository';
import { NotificationRepository } from '@repositories/NotificationRepository/implementation/NotificationRepository';

import { IBlockRepository } from '@repositories/BlockRepository/IBlockRepository';
import { BlockRepository } from '@repositories/BlockRepository/implementation/BlockRepository';

import { ISuggestionRepository } from '@repositories/SuggestionRepository/ISuggestionRepository';
import { SuggestionRepository } from '@repositories/SuggestionRepository/implementation/SuggestionRepository';

import { ISocialNetworkRepository } from '@repositories/SocialNetworkRepository/ISocialNetworkRepository';
import { SocialNetworkRepository } from '@repositories/SocialNetworkRepository/implementation/SocialNetworkRepository';

import { ISocialNetworkTypeRepository } from '@repositories/SocialNetworkTypeRepository/ISocialNetworkTypeRepository';
import { SocialNetworkTypeRepository } from '@repositories/SocialNetworkTypeRepository/implementation/SocialNetworkTypeRepository';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);

container.registerSingleton<IUserUpdateRepository>(
  'UserUpdateRepository',
  UserUpdateRepository,
);

container.registerSingleton<IEventRepository>(
  'EventRepository',
  EventRepository,
);

container.registerSingleton<IEventTypeRepository>(
  'EventTypeRepository',
  EventTypeRepository,
);

container.registerSingleton<IEmojiRepository>(
  'EmojiRepository',
  EmojiRepository,
);

container.registerSingleton<IEmojiTypeRepository>(
  'EmojiTypeRepository',
  EmojiTypeRepository,
);

container.registerSingleton<IReactRepository>(
  'ReactRepository',
  ReactRepository,
);

container.registerSingleton<IReportRepository>(
  'ReportRepository',
  ReportRepository,
);

container.registerSingleton<IParticipationRepository>(
  'ParticipationRepository',
  ParticipationRepository,
);

container.registerSingleton<IParticipationTypeRepository>(
  'ParticipationTypeRepository',
  ParticipationTypeRepository,
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

container.registerSingleton<IBlockRepository>(
  'BlockRepository',
  BlockRepository,
);

container.registerSingleton<ISuggestionRepository>(
  'SuggestionRepository',
  SuggestionRepository,
);

container.registerSingleton<ISocialNetworkRepository>(
  'SocialNetworkRepository',
  SocialNetworkRepository,
);

container.registerSingleton<ISocialNetworkTypeRepository>(
  'SocialNetworkTypeRepository',
  SocialNetworkTypeRepository,
);
