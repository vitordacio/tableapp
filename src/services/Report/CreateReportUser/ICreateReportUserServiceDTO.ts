export interface ICreateReportUserDTO {
  user_id: string;
  message?: string;
  reqUser: AuthorizedUser<UserPerm | PubPerm>;
}
