import { celebrate, Segments, Joi } from 'celebrate';

export const updateEventAddressIdMiddleware = celebrate({
  [Segments.BODY]: {
    event_id: Joi.string().required(),
    address_id: Joi.string().required(),
  },
});
