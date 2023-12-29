import { FindReportController } from '@controllers/Report/FindReportController';

function FindReportControllerFactory() {
  const findReportController = new FindReportController();

  return findReportController;
}

const findReportController = FindReportControllerFactory();

export { findReportController };
