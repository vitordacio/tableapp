import { celebrate, Segments, Joi } from 'celebrate';

export const createReportUserMiddleware = celebrate({
  [Segments.BODY]: {
    user_id: Joi.string().uuid().required(),
    message: Joi.string().allow(''),
  },
});

export const createReportEventMiddleware = celebrate({
  [Segments.BODY]: {
    event_id: Joi.string().uuid().required(),
    message: Joi.string().allow(''),
  },
});
