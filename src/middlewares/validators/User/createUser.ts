import { celebrate, Segments, Joi } from 'celebrate';

export const createUserMiddleware = celebrate({
  [Segments.BODY]: {
    email: Joi.string().email().required(),
    name: Joi.string().min(4).max(30).required(),
    username: Joi.string().min(4).max(16).required(),
    password: Joi.string().min(6).required(),
  },
});
