import { celebrate, Segments, Joi } from 'celebrate';

export const createSuggestionMiddleware = celebrate({
  [Segments.BODY]: {
    message: Joi.string().required(),
  },
});
