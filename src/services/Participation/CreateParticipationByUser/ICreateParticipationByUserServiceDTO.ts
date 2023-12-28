export interface ICreateParticipationByUserDTO {
  event_id: string;
  user: AuthorizedUser<UserPerm | PubPerm>;
}
