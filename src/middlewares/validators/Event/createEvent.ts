import { celebrate, Segments, Joi } from 'celebrate';

export const createEventMiddleware = celebrate({
  [Segments.BODY]: {
    type_id: Joi.string().uuid().required(),
    name: Joi.string().required(),
    location: Joi.string().required(),
    time: Joi.date().required(),
    club_name: Joi.string(),
    performer: Joi.string(),
    additional: Joi.string(),
    drink_preferences: Joi.string(),
    age_limit: Joi.number(),
    free_woman: Joi.number(),
    free_man: Joi.number(),
  },
});
