export interface ICreateParticipationByEventDTO {
  event_id: string;
  user_id: string;
  confirmed_by_event: boolean;
  type?: string;
  user: AuthorizedUser<UserPerm | PubPerm>;
}
