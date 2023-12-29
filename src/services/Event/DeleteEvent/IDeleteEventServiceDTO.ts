export interface IDeleteEventPerformerDTO {
  performer_id: string;
  reqUser: AuthorizedUser<UserPerm | PubPerm>;
}
