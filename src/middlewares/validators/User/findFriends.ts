import { celebrate, Segments, Joi } from 'celebrate';

export const findFriendsMiddleware = celebrate({
  [Segments.QUERY]: {
    page: Joi.number().allow(''),
    limit: Joi.number().allow(''),
  },
});
