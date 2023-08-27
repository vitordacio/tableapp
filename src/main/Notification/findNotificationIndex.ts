import { FindNotificationIndexController } from '@controllers/Notification/FindNotificationIndexController';

function FindNotificationIndexControllerFactory() {
  const findNotificationIndexController = new FindNotificationIndexController();

  return findNotificationIndexController;
}

const findNotificationIndexController =
  FindNotificationIndexControllerFactory();

export { findNotificationIndexController };
