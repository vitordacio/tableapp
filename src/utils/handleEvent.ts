import { Event } from '@entities/Event/Event';

export const checkEventStatus = (event: Event): Event['control']['status'] => {
  // const startDateTime: Date = new Date(`${event.date}T${event.time}`);
  // const finishDateTime: Date = new Date(
  //   `${event.finish_date}T${event.finish_time}`,
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
  participation_status: Event['control']['participation_status'];
};

export const checkCanSeeEventContent = ({
  event,
  participation_status,
}: checkCanSeeEventContent): boolean => {
  if (!event.type.verified || !event.private) return true;
  if (
    participation_status &&
    ['author', 'user_in', 'guest_in', 'mod_in', 'vip_in'].includes(
      participation_status,
    )
  )
    return true;

  return false;
};
