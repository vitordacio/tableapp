export interface ICreateRequestDTO {
  event_id: string;
  user: AuthorizedUser<UserPerm | PubPerm>;
}
