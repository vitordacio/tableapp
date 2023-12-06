import { celebrate, Segments, Joi } from 'celebrate';

export const updateEventHoursMiddleware = celebrate({
  [Segments.BODY]: {
    event_id: Joi.string().required(),
    start_time: Joi.date().required(),
    finish_time: Joi.date().allow(''),
  },
});
