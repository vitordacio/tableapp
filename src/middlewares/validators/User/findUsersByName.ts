import { celebrate, Segments, Joi } from 'celebrate';

export const findUsersByNameMiddleware = celebrate({
  [Segments.QUERY]: {
    name: Joi.string().min(3).required(),
    page: Joi.number(),
    limit: Joi.number(),
  },
});
