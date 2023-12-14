import { celebrate, Segments, Joi } from 'celebrate';

export const verifyParamId = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),
  },
});
