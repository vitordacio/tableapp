import { celebrate, Segments, Joi } from 'celebrate';

export const findUsersByNameMiddleware = celebrate({
  [Segments.QUERY]: {
    name: Joi.string().required(),
    page: Joi.number(),
    limit: Joi.number(),
  },
});
