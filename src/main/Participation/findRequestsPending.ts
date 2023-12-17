import { FindRequestsPendingController } from '@controllers/Participation/FindRequestsPendingController';

function FindRequestsPendingControllerFactory() {
  const findRequestsPendingController = new FindRequestsPendingController();

  return findRequestsPendingController;
}

const findRequestsPendingController = FindRequestsPendingControllerFactory();

export { findRequestsPendingController };
