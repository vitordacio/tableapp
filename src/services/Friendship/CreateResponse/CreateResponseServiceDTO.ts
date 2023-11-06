export interface ICreateResponseDTO {
  friendship_id: string;
  confirmed: boolean;
  user: AuthorizedUser<UserPerm | PubPerm>;
}
