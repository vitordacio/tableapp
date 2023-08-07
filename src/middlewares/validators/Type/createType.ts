import { celebrate, Segments, Joi } from 'celebrate';

export const createTypeMiddleware = celebrate({
  [Segments.BODY]: {
    type: Joi.string().required(),
    type_name: Joi.string().required(),
  },
});
