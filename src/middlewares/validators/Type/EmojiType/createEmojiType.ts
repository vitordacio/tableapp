import { celebrate, Segments, Joi } from 'celebrate';

export const createEmojiTypeMiddleware = celebrate({
  [Segments.BODY]: {
    category: Joi.string().required(),
  },
});
