import { celebrate, Segments, Joi } from 'celebrate';

export const createReactMiddleware = celebrate({
  [Segments.BODY]: {
    emoji_id: Joi.string().uuid().required(),
    message: Joi.string().allow(''),
  },
});
