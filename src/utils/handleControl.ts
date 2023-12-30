// import { Friendship } from '@entities/Friendship/Friendship';
// import { User  } from '@entities/User/User';
// import { Block } from '@entities/Block/Block';
// import { checkFriendship } from './handleFriendship';
// import { checkCanSeeUserContent } from './handleUser';
// import { Event, EventControl } from '@entities/Event/Event';
// import { Participation } from '@entities/Participation/Participation';
// import { checkParticipationStatus } from './handleParticipation';
// import { checkCanSeeEventContent, checkEventStatus } from './handleEvent';

// type generateUserControl = {
//   friendship: Friendship | undefined;
//   block: Block | undefined;
//   requester: User;
//   user: User;
// };

// export function generateUserControl({
//   friendship,
//   block,
//   requester,
//   user,
// }: generateUserControl): UserControl {
//   const control: UserControl = {
//     friendship_id: friendship?.id_friendship || '',
//     friendship_status: checkFriendship({
//       user_id: requester.id_user,
//       friendship,
//     }),
//     can_see_content: false,
//   };

//   control.can_see_content = checkCanSeeUserContent({
//     requester,
//     user,
//     friendship_status: control.friendship_status,
//     block,
//   });

//   return control;
// }

// type generateEventControl = {
//   participation: Participation | undefined;
//   event: Event;
//   user: User;
// };

// export function generateEventControl({
//   participation,
//   event,
//   user,
// }: generateEventControl): EventControl {
//   const control: EventControl = {
//     participation_id: participation?.id_participation || '',
//     status: checkEventStatus(event),
//     participation_status: checkParticipationStatus({
//       user,
//       event,
//       participation,
//     }),
//     can_see_content: false,
//   };

//   control.can_see_content = checkCanSeeEventContent({
//     event,
//     participation_status: control.participation_status,
//   });

//   return control;
// }
