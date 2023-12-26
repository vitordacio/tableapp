export interface IDeleteReactDTO {
  react_id: string;
  reqUser: AuthorizedUser<UserPerm | PubPerm>;
}
