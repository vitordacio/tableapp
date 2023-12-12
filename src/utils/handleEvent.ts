import { Event } from '@entities/Event/Event';

export const checkEventStatus = (event: Event): Event['status'] => {
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
