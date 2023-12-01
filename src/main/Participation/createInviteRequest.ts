import { CreateInviteRequestController } from '@controllers/Participation/CreateInviteRequestController';

function CreateInviteRequestControllerFactory() {
  const createInviteRequestController = new CreateInviteRequestController();

  return createInviteRequestController;
}

const createInviteRequestController = CreateInviteRequestControllerFactory();

export { createInviteRequestController };
