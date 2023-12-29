import { CreateReportEventController } from '@controllers/Report/CreateReportEventController';

function CreateReportEventControllerFactory() {
  const createReportEventController = new CreateReportEventController();

  return createReportEventController;
}

const createReportEventController = CreateReportEventControllerFactory();

export { createReportEventController };
