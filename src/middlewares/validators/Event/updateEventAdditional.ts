import { celebrate, Segments, Joi } from 'celebrate';

export const updateEventAdditionalMiddleware = celebrate({
  [Segments.BODY]: {
    event_id: Joi.string().required(),
    additional: Joi.string().required(),
  },
});
