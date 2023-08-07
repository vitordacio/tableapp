import { FindMeetingController } from '@controllers/Meeting/FindMeetingController';

function FindMeetingControllerFactory() {
  const findMeetingController = new FindMeetingController();

  return findMeetingController;
}

const findMeetingController = FindMeetingControllerFactory();

export { findMeetingController };
