import { CreateMeetingTypeController } from '@controllers/MeetingType/CreateMeetingTypeController';

function CreateMeetingTypeControllerFactory() {
  const createMeetingTypeController = new CreateMeetingTypeController();

  return createMeetingTypeController;
}

const createMeetingTypeController = CreateMeetingTypeControllerFactory();

export { createMeetingTypeController };
