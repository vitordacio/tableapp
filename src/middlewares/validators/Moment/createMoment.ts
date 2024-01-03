import { celebrate, Segments, Joi } from 'celebrate';

export const createMomentMiddleware = celebrate({
  [Segments.BODY]: {
    event_id: Joi.string().uuid().required(),
    title: Joi.string().allow(''),
    description: Joi.string().allow(''),
  },
});
