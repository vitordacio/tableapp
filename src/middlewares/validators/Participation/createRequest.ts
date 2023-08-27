import { celebrate, Segments, Joi } from 'celebrate';

export const createRequestMiddleware = celebrate({
  [Segments.BODY]: {
    event_id: Joi.string().uuid().required(),
  },
});
