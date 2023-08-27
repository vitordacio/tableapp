import { celebrate, Segments, Joi } from 'celebrate';

export const createAddressEventMiddleware = celebrate({
  [Segments.BODY]: {
    event_id: Joi.string().required(),
    zip: Joi.string(),
    street: Joi.string(),
    uf: Joi.string(),
    city: Joi.string(),
    district: Joi.string(),
    number: Joi.string(),
    lat: Joi.number(),
    long: Joi.number(),
  },
});
