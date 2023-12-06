import { UpdateEventMinAmountController } from '@controllers/Event/UpdateEventMinAmountController';

function UpdateEventMinAmountControllerFactory() {
  const updateEventMinAmountController = new UpdateEventMinAmountController();

  return updateEventMinAmountController;
}

const updateEventMinAmountController = UpdateEventMinAmountControllerFactory();

export { updateEventMinAmountController };
