import { Request, Response, Router } from 'express';

import { verifyToken } from '../middlewares/verifyToken';

import { deleteAddressController } from '../main/Address/deleteAddress';
import { createAddressPubMiddleware } from '../middlewares/validators/Address/createAddressPub';
import { createAddressEventMiddleware } from '../middlewares/validators/Address/createAddressEvent';
import { createAddressEventController } from '../main/Address/createAddressEvent';
import { createAddressPubController } from '../main/Address/createAddressPub';

const addressRouter = Router();

addressRouter.post(
  '/address/event',
  [verifyToken, createAddressEventMiddleware],
  async (req: Request, res: Response) => {
    return createAddressEventController.handle(req, res);
  },
);

addressRouter.post(
  '/address/pub',
  [verifyToken, createAddressPubMiddleware],
  async (req: Request, res: Response) => {
    return createAddressPubController.handle(req, res);
  },
);

addressRouter.delete(
  '/address/:id',
  verifyToken,
  async (req: Request, res: Response) => {
    return deleteAddressController.handle(req, res);
  },
);

export { addressRouter };
