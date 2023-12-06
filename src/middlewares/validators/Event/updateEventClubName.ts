import { celebrate, Segments, Joi } from 'celebrate';

export const updateEventClubNameMiddleware = celebrate({
  [Segments.BODY]: {
    event_id: Joi.string().required(),
    club_name: Joi.string().required(),
  },
});
