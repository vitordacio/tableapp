import { celebrate, Segments, Joi } from 'celebrate';
// import validator from 'cpf-cnpj-validator';

// const JoiCnpj = Joi.extend(validator);

export const loginUserMiddleware = celebrate({
  [Segments.BODY]: {
    login: Joi.string().required(),
    password: Joi.string().required().label('senha'),
  },
});
