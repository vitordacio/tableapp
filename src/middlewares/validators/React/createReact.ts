import { celebrate, Segments, Joi } from 'celebrate';

export const createReactUserMiddleware = celebrate({
  [Segments.BODY]: {
    user_id: Joi.string().uuid().required(),
    emoji_id: Joi.string().uuid().required(),
    message: Joi.string().allow(''),
  },
});

export const createReactEventMiddleware = celebrate({
  [Segments.BODY]: {
    event_id: Joi.string().uuid().required(),
    emoji_id: Joi.string().uuid().required(),
    message: Joi.string().allow(''),
  },
});
