import { celebrate, Segments, Joi } from 'celebrate';

export const verifyParamUserId = celebrate({
  [Segments.PARAMS]: {
    user_id: Joi.string().uuid().required(),
  },
});

export const verifyParamEventId = celebrate({
  [Segments.PARAMS]: {
    event_id: Joi.string().uuid().required(),
  },
});

export const verifyParamParticipationId = celebrate({
  [Segments.PARAMS]: {
    participation_id: Joi.string().uuid().required(),
  },
});

export const verifyParamFriendshipId = celebrate({
  [Segments.PARAMS]: {
    friendship_id: Joi.string().uuid().required(),
  },
});

export const verifyParamEmojiId = celebrate({
  [Segments.PARAMS]: {
    emoji_id: Joi.string().uuid().required(),
  },
});
