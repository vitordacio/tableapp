export interface ICreateResponseInviteDTO {
  participation_id: string;
  confirmed_by_user: boolean;
  user: AuthorizedUser<UserPerm | PubPerm>;
}
