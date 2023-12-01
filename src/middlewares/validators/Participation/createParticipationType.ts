import { celebrate, Segments, Joi } from 'celebrate';

export const createParticipationTypeMiddleware = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
  },
});
