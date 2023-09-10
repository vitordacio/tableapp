export interface ICreateParticipationByUserDTO {
  event_id: string;
  confirmed_by_user: boolean;
  user: AuthorizedUser<UserPerm | PubPerm>;
}
