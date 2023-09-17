import { celebrate, Segments, Joi } from 'celebrate';

export const updateEventActivedMiddleware = celebrate({
  [Segments.BODY]: {
    event_id: Joi.string().required(),
    actived: Joi.boolean().required(),
  },
});
