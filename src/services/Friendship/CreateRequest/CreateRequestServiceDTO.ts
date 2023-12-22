export interface ICreateRequestDTO {
  user_id: string;
  reqUser: AuthorizedUser<UserPerm | PubPerm>;
}
