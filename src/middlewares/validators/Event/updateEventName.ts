import { celebrate, Segments, Joi } from 'celebrate';

export const updateEventNameMiddleware = celebrate({
  [Segments.BODY]: {
    event_id: Joi.string().required(),
    name: Joi.string().required(),
  },
});
