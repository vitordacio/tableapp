import { celebrate, Segments, Joi } from 'celebrate';

export const createParticipationResponseMiddleware = celebrate({
  [Segments.BODY]: {
    participation_id: Joi.string().uuid().required(),
    confirm: Joi.boolean().required(),
  },
});
