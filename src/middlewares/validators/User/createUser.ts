import { celebrate, Segments, Joi } from 'celebrate';

export const createUserMiddleware = celebrate({
  [Segments.BODY]: {
    email: Joi.string().email().required(),
    name: Joi.string().required().label('nome'),
    username: Joi.string().required().label('nome de usuário'),
    password: Joi.string().required().label('senha'),
  },
});
