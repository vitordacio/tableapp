export interface ICreateInviteResponseDTO {
  event_id: string;
  user: AuthorizedUser<UserPerm | PubPerm>;
}
