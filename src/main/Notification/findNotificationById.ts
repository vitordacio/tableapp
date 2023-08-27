import { FindNotificationByIdController } from '@controllers/Notification/FindNotificationByIdController';

function FindNotificationByIdControllerFactory() {
  const findNotificationByIdController = new FindNotificationByIdController();

  return findNotificationByIdController;
}

const findNotificationByIdController = FindNotificationByIdControllerFactory();

export { findNotificationByIdController };
