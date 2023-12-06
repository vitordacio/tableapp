import { celebrate, Segments, Joi } from 'celebrate';

export const updateEventPerformerMiddleware = celebrate({
  [Segments.BODY]: {
    event_id: Joi.string().required(),
    performer: Joi.string().required(),
  },
});
