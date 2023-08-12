import { celebrate, Segments, Joi } from 'celebrate';

export const createTableMiddleware = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    location: Joi.string().required(),
    time: Joi.date().required(),
    additional: Joi.string(),
    drink_preferences: Joi.string(),
    age_limit: Joi.number(),
    free_woman: Joi.number(),
    free_man: Joi.number(),
  },
});
