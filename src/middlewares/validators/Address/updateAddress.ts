import { celebrate, Segments, Joi } from 'celebrate';

export const updateAddressMiddleware = celebrate({
  [Segments.BODY]: {
    name: Joi.string().label('nome'),
  },
});
