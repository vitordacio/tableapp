import { celebrate, Segments, Joi } from 'celebrate';

export const createMeetingMiddleware = celebrate({
  [Segments.BODY]: {
    type_id: Joi.string().uuid().required(),
    name: Joi.string().required(),
    location: Joi.string().required(),
    description: Joi.string(),
  },
});
