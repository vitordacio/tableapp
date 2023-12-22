export interface ICreateResponseDTO {
  user_id: string;
  reqUser: AuthorizedUser<UserPerm | PubPerm>;
}
