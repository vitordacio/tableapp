export interface ICreateRequestDTO {
  friend_id: string;
  user: AuthorizedUser<UserPerm | PubPerm>;
}
