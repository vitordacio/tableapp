import { celebrate, Segments, Joi } from 'celebrate';

export const updateEventDrinkPreferencesMiddleware = celebrate({
  [Segments.BODY]: {
    event_id: Joi.string().required(),
    drink_preferences: Joi.string().required(),
  },
});
