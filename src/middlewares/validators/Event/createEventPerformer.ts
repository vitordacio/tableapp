import { celebrate, Segments, Joi } from 'celebrate';

export const createEventPerformerMiddleware = celebrate({
  [Segments.BODY]: {
    event_id: Joi.string().uuid().required(),
    user_id: Joi.string().uuid().allow(''),
    name: Joi.date().allow(''),
  },
});
