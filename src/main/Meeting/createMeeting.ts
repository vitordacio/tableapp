import { CreateMeetingController } from '@controllers/Meeting/CreateMeetingController';

function CreateMeetingControllerFactory() {
  const createMeetingController = new CreateMeetingController();

  return createMeetingController;
}

const createMeetingController = CreateMeetingControllerFactory();

export { createMeetingController };
