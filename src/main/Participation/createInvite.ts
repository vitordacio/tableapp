import { CreateInviteController } from '@controllers/Participation/CreateInviteController';

function createInviteControllerFactory() {
  const createInviteController = new CreateInviteController();

  return createInviteController;
}

const createInviteController = createInviteControllerFactory();

export { createInviteController };
