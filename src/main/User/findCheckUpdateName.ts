import { FindCheckUpdateNameController } from '@controllers/User/FindCheckUpdateNameController';

function FindCheckUpdateNameControllerFactory() {
  const findCheckUpdateNameController = new FindCheckUpdateNameController();

  return findCheckUpdateNameController;
}

const findCheckUpdateNameController = FindCheckUpdateNameControllerFactory();

export { findCheckUpdateNameController };
