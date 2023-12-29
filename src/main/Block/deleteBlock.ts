import { DeleteBlockController } from '@controllers/Block/DeleteBlockController';

function DeleteBlockControllerFactory() {
  const deleteBlockController = new DeleteBlockController();

  return deleteBlockController;
}

const deleteBlockController = DeleteBlockControllerFactory();

export { deleteBlockController };
