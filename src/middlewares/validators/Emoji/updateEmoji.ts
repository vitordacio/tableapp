import { celebrate, Segments, Joi } from 'celebrate';

export const updateEmojiMiddleware = celebrate({
  [Segments.BODY]: {
    emoji_id: Joi.string().uuid().required(),
    type_id: Joi.string().uuid().allow(''),
    value: Joi.string().required(),
    shorthand: Joi.string().required(),
  },
});
