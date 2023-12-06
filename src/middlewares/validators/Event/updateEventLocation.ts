import { celebrate, Segments, Joi } from 'celebrate';

export const updateEventLocationMiddleware = celebrate({
  [Segments.BODY]: {
    event_id: Joi.string().required(),
    location: Joi.string().required(),
  },
});
