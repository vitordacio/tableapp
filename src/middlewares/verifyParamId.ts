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

export const verifyParamReactId = celebrate({
  [Segments.PARAMS]: {
    react_id: Joi.string().uuid().required(),
  },
});

export const verifyParamSuggestionId = celebrate({
  [Segments.PARAMS]: {
    suggestion_id: Joi.string().uuid().required(),
  },
});

export const verifyParamReportId = celebrate({
  [Segments.PARAMS]: {
    report_id: Joi.string().uuid().required(),
  },
});

export const verifyParamMomentId = celebrate({
  [Segments.PARAMS]: {
    moment_id: Joi.string().uuid().required(),
  },
});
