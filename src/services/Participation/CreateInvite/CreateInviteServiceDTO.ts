export interface ICreateInviteDTO {
  event_id: string;
  user_id: string;
  user: AuthorizedUser<UserPerm | PubPerm>;
  type: string;
}
