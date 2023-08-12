export interface ICreateParticipationModDTO {
  event_id: string;
  user_id: string;
  user: AuthorizedUser<UserPerm | PubPerm>;
}
