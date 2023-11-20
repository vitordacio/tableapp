import { celebrate, Segments, Joi } from 'celebrate';

export const createSocialNetworkMiddleware = celebrate({
  [Segments.BODY]: {
    username: Joi.string().required(),
    type_id: Joi.string().required(),
  },
});
