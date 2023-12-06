import { celebrate, Segments, Joi } from 'celebrate';

export const updateEventMinAmountMiddleware = celebrate({
  [Segments.BODY]: {
    event_id: Joi.string().required(),
    min_amount: Joi.string().required(),
  },
});
