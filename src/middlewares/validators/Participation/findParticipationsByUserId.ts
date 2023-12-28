import { celebrate, Segments, Joi } from 'celebrate';

export const findParticipationsByUserIdMiddleware = celebrate({
  [Segments.QUERY]: {
    page: Joi.number().allow(''),
    limit: Joi.number().allow(''),
  },
});
