import { CreateReportUserController } from '@controllers/Report/CreateReportUserController';

function CreateReportUserControllerFactory() {
  const createReportUserController = new CreateReportUserController();

  return createReportUserController;
}

const createReportUserController = CreateReportUserControllerFactory();

export { createReportUserController };
