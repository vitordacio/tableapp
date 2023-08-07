import { UpdateMeetingController } from '@controllers/Meeting/UpdateMeetingController';

function UpdateMeetingControllerFactory() {
  const updateMeetingController = new UpdateMeetingController();

  return updateMeetingController;
}

const updateMeetingController = UpdateMeetingControllerFactory();

export { updateMeetingController };
