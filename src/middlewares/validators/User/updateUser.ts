import { celebrate, Segments, Joi } from 'celebrate';

export const updateUserMiddleware = celebrate({
  [Segments.BODY]: {
    name: Joi.string().min(3).required(),
    bio: Joi.string().allow(''),
    location: Joi.string().allow(''),
    age: Joi.number().allow(''),
    gender: Joi.string().allow('').valid('male', 'female'),
  },
});
