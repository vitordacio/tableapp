import { celebrate, Segments, Joi } from 'celebrate';

export const updateUsernameMiddleware = celebrate({
  [Segments.BODY]: {
    username: Joi.string().min(4).max(16).required(),
  },
});

export const updateNameMiddleware = celebrate({
  [Segments.BODY]: {
    name: Joi.string().min(3).max(30).required(),
  },
});

export const updateBioMiddleware = celebrate({
  [Segments.BODY]: {
    bio: Joi.string().max(150).required(),
  },
});

export const updateLocationMiddleware = celebrate({
  [Segments.BODY]: {
    location: Joi.string().max(30).required(),
  },
});

export const updateGenderMiddleware = celebrate({
  [Segments.BODY]: {
    gender: Joi.string().max(30).required(),
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
