import { celebrate, Segments, Joi } from 'celebrate';

export const createEventMiddleware = celebrate({
  [Segments.BODY]: {
    type_id: Joi.string().required(),
    name: Joi.string().min(4).max(30).required(),
    location: Joi.string().required(),
    start_time: Joi.date().allow(''),
    finish_time: Joi.date().allow(''),
    is_private: Joi.boolean().allow(''),
    additional: Joi.string().allow(''),
    drink_preferences: Joi.string().allow(''),
    min_amount: Joi.string().allow(''),
    club_name: Joi.string().allow(''),
    performer: Joi.string().allow(''),
    ticket_value: Joi.string().allow(''),
    tickets_free: Joi.number().allow(''),
    address_id: Joi.string().allow(''),
  },
});
