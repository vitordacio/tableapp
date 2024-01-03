import { celebrate, Segments, Joi } from 'celebrate';

export const updateMomentMiddleware = celebrate({
  [Segments.BODY]: {
    moment_id: Joi.string().uuid().required(),
    title: Joi.string().allow(''),
    description: Joi.string().allow(''),
  },
});
