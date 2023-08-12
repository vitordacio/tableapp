import { CreateTableController } from '@controllers/Event/Table/CreateTableController';

function CreateTableControllerFactory() {
  const createTableController = new CreateTableController();

  return createTableController;
}

const createTableController = CreateTableControllerFactory();

export { createTableController };
