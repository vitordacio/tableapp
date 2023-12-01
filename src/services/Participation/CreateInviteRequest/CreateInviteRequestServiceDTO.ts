export interface ICreateInviteRequestDTO {
  event_id: string;
  user_id: string;
  type_id: string;
  user: AuthorizedUser<UserPerm | PubPerm>;
}
