import { celebrate, Segments, Joi } from 'celebrate';

export const createEmojiMiddleware = celebrate({
  [Segments.BODY]: {
    type_id: Joi.string().uuid().required(),
    value: Joi.string().required(),
    shorthand: Joi.string().required(),
  },
});
