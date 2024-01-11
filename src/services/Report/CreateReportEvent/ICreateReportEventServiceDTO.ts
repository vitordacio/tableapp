export interface ICreateReportEventDTO {
  event_id: string;
  message: string;
  reqUser: AuthorizedUser<UserPerm | PubPerm>;
}
