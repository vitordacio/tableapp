import { celebrate, Segments, Joi } from 'celebrate';

export const findCheckUpdateMiddleware = celebrate({
  [Segments.PARAMS]: {
    type: Joi.string().valid('name', 'username', 'email', 'password'),
  },
});
