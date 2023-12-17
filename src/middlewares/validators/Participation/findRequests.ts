import { celebrate, Segments, Joi } from 'celebrate';

export const findRequestsMiddleware = celebrate({
  [Segments.PARAMS]: {
    event_id: Joi.string().uuid().required(),
  },
  [Segments.QUERY]: {
    page: Joi.number().allow(''),
    limit: Joi.number().allow(''),
  },
});
