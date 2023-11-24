import { celebrate, Segments, Joi } from 'celebrate';

export const findUsersByNameMiddleware = celebrate({
  [Segments.QUERY]: {
    name: Joi.string().allow(''),
    page: Joi.number(),
    limit: Joi.number(),
  },
});
