export interface ICreateParticipationRequestDTO {
  event_id: string;
  user: AuthorizedUser<UserPerm | PubPerm>;
}
