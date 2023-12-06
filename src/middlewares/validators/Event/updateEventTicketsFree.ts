import { celebrate, Segments, Joi } from 'celebrate';

export const updateEventTicketsFreeMiddleware = celebrate({
  [Segments.BODY]: {
    event_id: Joi.string().required(),
    tickets_free: Joi.number().required(),
  },
});
