import { CreateInviteResponseController } from '@controllers/Participation/CreateInviteResponseController';

function CreateInviteResponseControllerFactory() {
  const createInviteResponseController = new CreateInviteResponseController();

  return createInviteResponseController;
}

const createInviteResponseController = CreateInviteResponseControllerFactory();

export { createInviteResponseController };
