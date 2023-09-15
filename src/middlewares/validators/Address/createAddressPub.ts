import { celebrate, Segments, Joi } from 'celebrate';

export const createAddressPubMiddleware = celebrate({
  [Segments.BODY]: {
    user_id: Joi.string().required(),
    lat: Joi.number().required(),
    long: Joi.number().required(),
    zip: Joi.string().allow(''),
    street: Joi.string().allow(''),
    uf: Joi.string().allow(''),
    city: Joi.string().allow(''),
    district: Joi.string().allow(''),
    number: Joi.string().allow(''),
  },
});
