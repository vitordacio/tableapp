import { celebrate, Segments, Joi } from 'celebrate';

export const updateEventTicketsValueMiddleware = celebrate({
  [Segments.BODY]: {
    event_id: Joi.string().required(),
    tickets_value: Joi.string().required(),
  },
});
