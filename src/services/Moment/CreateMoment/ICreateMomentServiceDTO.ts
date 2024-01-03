export interface ICreateMomentDTO {
  // file?: string;
  event_id: string;
  title?: string;
  description?: string;
  reqUser: AuthorizedUser<UserPerm | PubPerm>;
}
