export interface ICreateParticipationDTO {
  event_id: string;
  user: AuthorizedUser<UserPerm | PubPerm>;
}
