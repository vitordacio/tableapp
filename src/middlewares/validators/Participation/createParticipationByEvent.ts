import { celebrate, Segments, Joi } from 'celebrate';

export const createParticipationByEventMiddleware = celebrate({
  [Segments.BODY]: {
    event_id: Joi.string().uuid().required(),
    user_id: Joi.string().uuid().required(),
    confirmed_by_event: Joi.boolean().required(),
    type: Joi.string().valid('mod', 'vip', 'guest'),
  },
});
