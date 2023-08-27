import { celebrate, Segments, Joi } from 'celebrate';

export const createInviteMiddleware = celebrate({
  [Segments.BODY]: {
    event_id: Joi.string().uuid().required(),
    user_id: Joi.string().uuid().required(),
    type: Joi.string().required().valid('mod', 'vip', 'guest'),
  },
});
