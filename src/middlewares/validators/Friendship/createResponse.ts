import { celebrate, Segments, Joi } from 'celebrate';

export const createResponseMiddleware = celebrate({
  [Segments.BODY]: {
    friendship_id: Joi.string().uuid().required(),
    accepted: Joi.boolean().required(),
  },
});
