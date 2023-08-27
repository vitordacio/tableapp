import { celebrate, Segments, Joi } from 'celebrate';

export const createRequestMiddleware = celebrate({
  [Segments.BODY]: {
    friend_id: Joi.string().uuid().required(),
  },
});
