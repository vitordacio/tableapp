import { CreateParticipationInviteController } from '@controllers/Participation/CreateParticipationInviteController';

function createParticipationInviteControllerFactory() {
  const createParticipationInviteController =
    new CreateParticipationInviteController();

  return createParticipationInviteController;
}

const createParticipationInviteController =
  createParticipationInviteControllerFactory();

export { createParticipationInviteController };
