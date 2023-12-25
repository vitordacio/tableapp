import { celebrate, Segments, Joi } from 'celebrate';

export const createEventTypeMiddleware = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    verified: Joi.boolean().allow(''),
  },
});
