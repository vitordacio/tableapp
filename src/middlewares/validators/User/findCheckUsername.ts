import { celebrate, Segments, Joi } from 'celebrate';

export const findCheckUsernameMiddleware = celebrate({
  [Segments.PARAMS]: {
    username: Joi.string().required(),
  },
});
