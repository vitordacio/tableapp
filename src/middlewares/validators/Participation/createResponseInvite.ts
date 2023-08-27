import { celebrate, Segments, Joi } from 'celebrate';

export const createResponseInviteMiddleware = celebrate({
  [Segments.BODY]: {
    participation_id: Joi.string().uuid().required(),
    confirmed_by_user: Joi.boolean().required(),
  },
});
