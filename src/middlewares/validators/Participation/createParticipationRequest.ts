import { celebrate, Segments, Joi } from 'celebrate';

export const createParticipationRequestMiddleware = celebrate({
  [Segments.BODY]: {
    event_id: Joi.string().uuid().required(),
  },
});
