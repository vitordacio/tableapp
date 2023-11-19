import { celebrate, Segments, Joi } from 'celebrate';

export const createSocialNetworkMiddleware = celebrate({
  [Segments.BODY]: {
    username: Joi.string().required(),
    type: Joi.string()
      .valid('instagram', 'tiktok', 'twitter', 'twitch', 'youtube')
      .required(),
  },
});
