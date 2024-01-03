export interface ICreateParticipationByUserDTO {
  event_id: string;
  reqUser: AuthorizedUser<UserPerm | PubPerm>;
}
