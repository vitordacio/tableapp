import { FindReactsReceivedByUserIdController } from '@controllers/React/FindReactsReceivedByUserIdController';

function FindReactsReceivedByUserIdControllerFactory() {
  const findReactsReceivedByUserIdController =
    new FindReactsReceivedByUserIdController();

  return findReactsReceivedByUserIdController;
}

const findReactsReceivedByUserIdController =
  FindReactsReceivedByUserIdControllerFactory();

export { findReactsReceivedByUserIdController };
