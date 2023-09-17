import { celebrate, Segments, Joi } from 'celebrate';

export const createEventMiddleware = celebrate({
  [Segments.BODY]: {
    type: Joi.string().valid('table', 'party').required(),
    name: Joi.string().required(),
    location: Joi.string().required(),
    date: Joi.string().allow(''),
    time: Joi.string().allow(''),
    finish_date: Joi.string().allow(''),
    finish_time: Joi.string().allow(''),
    club_name: Joi.string().allow(''),
    performer: Joi.string().allow(''),
    additional: Joi.string().allow(''),
    drink_preferences: Joi.string().allow(''),
    age_limit: Joi.number().allow(''),
    free_ticket: Joi.number().allow(''),
    private: Joi.boolean().allow(''),
  },
});
