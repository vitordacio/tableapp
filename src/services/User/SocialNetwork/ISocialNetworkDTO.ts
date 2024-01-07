export interface ICreateSocialNetworkDTO {
  username: string;
  user: AuthorizedUser<UserPerm | PubPerm>;
  type_id: string;
}
