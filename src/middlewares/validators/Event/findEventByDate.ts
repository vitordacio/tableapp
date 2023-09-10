import { celebrate, Segments, Joi } from 'celebrate';

export const findEventByDateMiddleware = celebrate({
  [Segments.QUERY]: {
    initialDate: Joi.string().isoDate(),
    finalDate: Joi.string().isoDate(),
  },
});
