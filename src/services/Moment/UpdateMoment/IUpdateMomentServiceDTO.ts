export interface IUpdateMomentDTO {
  moment_id: string;
  title?: string;
  description?: string;
  reqUser: AuthorizedUser<UserPerm | PubPerm>;
}
