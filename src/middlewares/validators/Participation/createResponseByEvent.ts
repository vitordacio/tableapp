import { celebrate, Segments, Joi } from 'celebrate';

export const createResponseByEventMiddleware = celebrate({
  [Segments.BODY]: {
    participation_id: Joi.string().uuid().required(),
    confirmed_by_event: Joi.boolean().required(),
  },
});
