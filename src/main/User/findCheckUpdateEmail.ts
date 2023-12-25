import { FindCheckUpdateEmailController } from '@controllers/User/FindCheckUpdateEmailController';

function FindCheckUpdateEmailControllerFactory() {
  const findCheckUpdateEmailController = new FindCheckUpdateEmailController();

  return findCheckUpdateEmailController;
}

const findCheckUpdateEmailController = FindCheckUpdateEmailControllerFactory();

export { findCheckUpdateEmailController };
