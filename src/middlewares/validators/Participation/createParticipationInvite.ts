import { celebrate, Segments, Joi } from 'celebrate';

export const createParticipationInviteMiddleware = celebrate({
  [Segments.BODY]: {
    event_id: Joi.string().uuid().required(),
    user_id: Joi.string().uuid().required(),
    type: Joi.string().valid('mod', 'vip').allow(''),
  },
});
