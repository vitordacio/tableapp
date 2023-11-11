export interface ICreateResponseDTO {
  friend_id: string;
  user: AuthorizedUser<UserPerm | PubPerm>;
}
