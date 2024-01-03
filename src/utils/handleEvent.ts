import { User } from '@entities/User/User';
import { Event } from '@entities/Event/Event';
import { Participation } from '@entities/Participation/Participation';
import { checkParticipationStatus } from '@utils/handleParticipation';

export const checkEventStatus = (event: Event): Event['event_status'] => {
  const startDateTime: Date = new Date(event.start_time);
  const finishDateTime: Date = new Date(event.finish_time);

  const nowDateTime: Date = new Date();

  if (nowDateTime < startDateTime) {
    return 'awaiting';
  }
  if (startDateTime <= nowDateTime && nowDateTime <= finishDateTime) {
    return 'ongoing';
  }

  return 'finished';
};

type checkCanSeeEventContent = {
  event: Event;
  participation_status: Event['participation_status'];
};

export const checkCanSeeEventContent = ({
  event,
  participation_status,
}: checkCanSeeEventContent): Event['can_see_content'] => {
  if (event.type.verified || !event.private) return true;
  if (
    participation_status &&
    ['author', 'user_in', 'guest_in', 'mod_in', 'vip_in'].includes(
      participation_status,
    )
  )
    return true;

  return false;
};

type handleEventControlProps = {
  user: User;
  event: Event;
  participation?: Participation;
};

export const handleEventControl = ({
  user,
  event,
  participation,
}: handleEventControlProps) => {
  const event_status = checkEventStatus(event);
  const participation_id = participation?.id_participation || '';
  const participation_status = checkParticipationStatus({
    user,
    event,
    participation,
  });
  const participating = [
    'author',
    'user_in',
    'guest_in',
    'mod_in',
    'vip_in',
  ].includes(participation_status);
  const can_see_content = checkCanSeeEventContent({
    event,
    participation_status,
  });

  return {
    event_status,
    participation_id,
    participation_status,
    participating,
    can_see_content,
  };
};
