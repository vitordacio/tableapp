import { DeleteTableController } from '@controllers/Event/Table/DeleteTableController';

function DeleteTableControllerFactory() {
  const deleteTableController = new DeleteTableController();

  return deleteTableController;
}

const deleteTableController = DeleteTableControllerFactory();

export { deleteTableController };
