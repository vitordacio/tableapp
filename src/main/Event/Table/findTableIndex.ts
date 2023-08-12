import { FindTableIndexController } from '@controllers/Event/Table/FindTableIndexController';

function FindTableIndexControllerFactory() {
  const findTableIndexController = new FindTableIndexController();

  return findTableIndexController;
}

const findTableIndexController = FindTableIndexControllerFactory();

export { findTableIndexController };
