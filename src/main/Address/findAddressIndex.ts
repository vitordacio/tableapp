import { FindAddressIndexController } from '@controllers/Address/FindAddressIndexController';

function FindAddressIndexControllerFactory() {
  const findAddressIndexController = new FindAddressIndexController();

  return findAddressIndexController;
}

const findAddressIndexController = FindAddressIndexControllerFactory();

export { findAddressIndexController };
