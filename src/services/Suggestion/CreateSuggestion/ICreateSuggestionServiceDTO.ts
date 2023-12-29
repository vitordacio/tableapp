export interface ICreateSuggestionDTO {
  message: string;
  reqUser: AuthorizedUser<UserPerm | PubPerm>;
}
