export interface IBlockDTO {
  user_id: string;
  reqUser: AuthorizedUser<UserPerm | PubPerm>;
}
