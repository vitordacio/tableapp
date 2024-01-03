import { celebrate, Segments, Joi } from 'celebrate';

export const createAchievementTypeMiddleware = celebrate({
  [Segments.BODY]: {
    type: Joi.string().required(),
    category: Joi.string().required(),
    name: Joi.string().required(),
    difficulty: Joi.number().allow(''),
  },
});
