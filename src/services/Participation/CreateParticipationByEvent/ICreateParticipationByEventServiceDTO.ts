export interface ICreateParticipationByEventDTO {
  participation_id: string;
  confirm: boolean;
  reqUser: AuthorizedUser<UserPerm | PubPerm>;
}
