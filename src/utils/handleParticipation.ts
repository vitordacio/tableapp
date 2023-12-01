import { Event } from '@entities/Event/Event';
import { Participation } from '@entities/Participation/Participation';

type checkParticipation = {
  user_id: string;
  event: Event;
  participation?: Participation;
};

export const checkParticipationStatus = ({
  user_id,
  event,
  participation,
}: checkParticipation): Event['participation_status'] => {
  if (user_id === event.author_id) return 'author';

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
