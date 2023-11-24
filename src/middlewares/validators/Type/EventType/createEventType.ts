import { celebrate, Segments, Joi } from 'celebrate';

export const createEventTypeMiddleware = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    free_access: Joi.boolean().allow(''),
  },
});
