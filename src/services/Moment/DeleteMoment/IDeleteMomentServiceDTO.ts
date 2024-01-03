export interface IDeleteMomentDTO {
  moment_id: string;
  reqUser: AuthorizedUser<UserPerm | PubPerm>;
}
