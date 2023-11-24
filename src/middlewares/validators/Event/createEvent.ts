import { celebrate, Segments, Joi } from 'celebrate';

export const createEventMiddleware = celebrate({
  [Segments.BODY]: {
    type_id: Joi.string().required(),
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
    is_private: Joi.boolean().allow(''),
    address_id: Joi.string().allow(''),
    cover_photo: Joi.string().allow(''),
    ticket_value: Joi.number().allow(''),
    tickets_free: Joi.number().allow(''),
    min_amount: Joi.number().allow(''),
  },
});
