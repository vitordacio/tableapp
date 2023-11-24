import { celebrate, Segments, Joi } from 'celebrate';

export const createSocialNetworkTypeMiddleware = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    base_url: Joi.string().required(),
    deep_link: Joi.string().allow(''),
  },
});
