export interface ICreateParticipationByEventDTO {
  participation_id: string;
  confirmed_by_event: boolean;
  user: AuthorizedUser<UserPerm | PubPerm>;
}
