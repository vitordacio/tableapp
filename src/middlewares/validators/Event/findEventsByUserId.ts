import { celebrate, Segments, Joi } from 'celebrate';

export const findEventsByUserIdMiddleware = celebrate({
  [Segments.QUERY]: {
    page: Joi.number().allow(''),
    limit: Joi.number().allow(''),
  },
});
