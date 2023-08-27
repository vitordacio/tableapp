import { DeleteAddressController } from '@controllers/Address/DeleteAddressController';

function DeleteAddressControllerFactory() {
  const deleteAddressController = new DeleteAddressController();

  return deleteAddressController;
}

const deleteAddressController = DeleteAddressControllerFactory();

export { deleteAddressController };
