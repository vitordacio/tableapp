import { celebrate, Segments, Joi } from 'celebrate';

export const updateEventPrivateMiddleware = celebrate({
  [Segments.BODY]: {
    event_id: Joi.string().required(),
    is_private: Joi.boolean().required(),
  },
});
