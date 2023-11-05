import { celebrate, Segments, Joi } from 'celebrate';

export const updateUsernameMiddleware = celebrate({
  [Segments.BODY]: {
    username: Joi.string().min(4).max(15).required(),
  },
});

export const updateNameMiddleware = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
  },
});

export const updateBioMiddleware = celebrate({
  [Segments.BODY]: {
    bio: Joi.string().required(),
  },
});

export const updateLocationMiddleware = celebrate({
  [Segments.BODY]: {
    location: Joi.string().required(),
  },
});

export const updateGenderMiddleware = celebrate({
  [Segments.BODY]: {
    gender: Joi.string().required(),
  },
});

export const updateSocialMiddleware = celebrate({
  [Segments.BODY]: {
    social: Joi.string().required(),
    username: Joi.string().required(),
  },
});

export const updatePrivateMiddleware = celebrate({
  [Segments.BODY]: {
    private: Joi.boolean().required(),
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
    new_password: Joi.string().min(6).required(),
  },
});
