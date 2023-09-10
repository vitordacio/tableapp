import { celebrate, Segments, Joi } from 'celebrate';

export const createParticipationByUserMiddleware = celebrate({
  [Segments.BODY]: {
    event_id: Joi.string().uuid().required(),
    confirmed_by_user: Joi.boolean().required(),
  },
});
