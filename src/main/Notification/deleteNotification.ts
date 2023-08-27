import { DeleteNotificationController } from '@controllers/Notification/DeleteNotificationController';

function DeleteNotificationControllerFactory() {
  const deleteNotificationController = new DeleteNotificationController();

  return deleteNotificationController;
}

const deleteNotificationController = DeleteNotificationControllerFactory();

export { deleteNotificationController };
