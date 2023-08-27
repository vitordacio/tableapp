import { CreateResponseInviteController } from '@controllers/Participation/CreateResponseInviteController';

function createResponseInviteControllerFactory() {
  const createResponseInviteController = new CreateResponseInviteController();

  return createResponseInviteController;
}

const createResponseInviteController = createResponseInviteControllerFactory();

export { createResponseInviteController };
