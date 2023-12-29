import { celebrate, Segments, Joi } from 'celebrate';

export const deleteEventPerformerMiddleware = celebrate({
  [Segments.PARAMS]: {
    performer_id: Joi.string().uuid().required(),
  },
});
