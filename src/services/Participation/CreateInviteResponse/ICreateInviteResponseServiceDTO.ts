export interface ICreateInviteResponseDTO {
  event_id: string;
  reqUser: AuthorizedUser<UserPerm | PubPerm>;
}
