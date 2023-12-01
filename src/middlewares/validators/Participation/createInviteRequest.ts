import { celebrate, Segments, Joi } from 'celebrate';

export const createInviteRequestMiddleware = celebrate({
  [Segments.BODY]: {
    event_id: Joi.string().uuid().required(),
    user_id: Joi.string().uuid().required(),
    type_id: Joi.string().required(),
  },
});
