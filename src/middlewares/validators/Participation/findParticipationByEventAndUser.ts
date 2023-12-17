import { celebrate, Segments, Joi } from 'celebrate';

export const findParticipationByEventAndUserMiddleware = celebrate({
  [Segments.PARAMS]: {
    event_id: Joi.string().uuid().required(),
    user_id: Joi.string().uuid().required(),
  },
});
