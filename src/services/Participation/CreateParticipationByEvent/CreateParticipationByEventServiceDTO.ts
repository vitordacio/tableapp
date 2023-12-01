export interface ICreateParticipationByEventDTO {
  participation_id: string;
  user: AuthorizedUser<UserPerm | PubPerm>;
}
