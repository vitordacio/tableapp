import { FindRequestsReviwedController } from '@controllers/Participation/FindRequestsReviwedController';

function FindRequestsReviwedControllerFactory() {
  const findRequestsReviwedController = new FindRequestsReviwedController();

  return findRequestsReviwedController;
}

const findRequestsReviwedController = FindRequestsReviwedControllerFactory();

export { findRequestsReviwedController };
