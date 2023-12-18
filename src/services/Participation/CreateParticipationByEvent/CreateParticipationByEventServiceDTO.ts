export interface ICreateParticipationByEventDTO {
  participation_id: string;
  confirm: boolean;
  user: AuthorizedUser<UserPerm | PubPerm>;
}
