import { celebrate, Segments, Joi } from 'celebrate';

export const createParticipationMiddleware = celebrate({
  [Segments.BODY]: {
    meeting_id: Joi.string().uuid().required(),
    type_id: Joi.string().uuid().required(),
    going: Joi.boolean().required(),
    description: Joi.string().required(),
  },
});
