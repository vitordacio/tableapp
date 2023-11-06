import { celebrate, Segments, Joi } from 'celebrate';

export const findNotificationsMiddleware = celebrate({
  [Segments.QUERY]: {
    page: Joi.number().allow(''),
    limit: Joi.number().allow(''),
  },
});
