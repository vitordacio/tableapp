import { DeleteReactController } from '@controllers/React/DeleteReactController';

function DeleteReactControllerFactory() {
  const deleteReactController = new DeleteReactController();

  return deleteReactController;
}

const deleteReactController = DeleteReactControllerFactory();

export { deleteReactController };
