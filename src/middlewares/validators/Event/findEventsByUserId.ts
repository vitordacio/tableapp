import { celebrate, Segments, Joi } from 'celebrate';

export const findEventsByUserIdMiddleware = celebrate({
  [Segments.PARAMS]: {
    user_id: Joi.string().uuid().required(),
  },
  [Segments.QUERY]: {
    page: Joi.number().allow(''),
    limit: Joi.number().allow(''),
  },
});
