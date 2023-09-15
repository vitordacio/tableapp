import { celebrate, Segments, Joi } from 'celebrate';

export const findEventByLocationMiddleware = celebrate({
  [Segments.BODY]: {
    lat: Joi.number().required(),
    long: Joi.number().required(),
  },
});
