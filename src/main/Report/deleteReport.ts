import { DeleteReportController } from '@controllers/Report/DeleteReportController';

function DeleteReportControllerFactory() {
  const deleteReportController = new DeleteReportController();

  return deleteReportController;
}

const deleteReportController = DeleteReportControllerFactory();

export { deleteReportController };
