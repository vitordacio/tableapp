import { Event } from '@entities/Event/Event';
import { Participation } from '@entities/Participation/Participation';
import { User } from '@entities/User/User';

type checkParticipation = {
  user: User;
  event: Event;
  participation?: Participation;
};

export const checkParticipationStatus = ({
  user,
  event,
  participation,
}: checkParticipation): Event['participation_status'] => {
  if (user.id_user === event.author_id) return 'author';

  if (!participation) return '';

  if (participation.type.name === 'user') {
    return participation.in ? 'user_in' : 'user_out';
  }

  if (participation.type.name === 'guest') {
    return participation.in ? 'guest_in' : 'guest_out';
  }

  if (participation.type.name === 'mod') {
    return participation.in ? 'mod_in' : 'mod_out';
  }

  if (participation.type.name === 'vip') {
    return participation.in ? 'vip_in' : 'vip_out';
  }

  return '';
};
