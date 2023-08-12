import { celebrate, Segments, Joi } from 'celebrate';

export const createParticipationModMiddleware = celebrate({
  [Segments.BODY]: {
    event_id: Joi.string().uuid().required(),
    user_id: Joi.string().uuid().required(),
  },
});
