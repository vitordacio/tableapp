import { celebrate, Segments, Joi } from 'celebrate';

export const updateUsernameMiddleware = celebrate({
  [Segments.BODY]: {
    username: Joi.string().min(4).max(15).required(),
  },
});

export const updateEmailMiddleware = celebrate({
  [Segments.BODY]: {
    email: Joi.string().email().required(),
  },
});

export const updatePasswordMiddleware = celebrate({
  [Segments.BODY]: {
    password: Joi.string().min(6).required(),
  },
});

export const updatePrivateMiddleware = celebrate({
  [Segments.BODY]: {
    private: Joi.boolean().required(),
  },
});
