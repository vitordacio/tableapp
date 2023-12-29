import { FindCheckUpdateController } from '@controllers/User/FindCheckUpdateController';

function FindCheckUpdateControllerFactory() {
  const findCheckUpdateController = new FindCheckUpdateController();

  return findCheckUpdateController;
}

const findCheckUpdateController = FindCheckUpdateControllerFactory();

export { findCheckUpdateController };
