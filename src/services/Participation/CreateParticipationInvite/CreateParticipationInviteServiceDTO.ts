export interface ICreateParticipationInviteDTO {
  event_id: string;
  user_id: string;
  type?: string;
  user: AuthorizedUser<UserPerm | PubPerm>;
}
