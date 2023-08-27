export interface ICreateResponseDTO {
  friendship_id: string;
  accepted: boolean;
  user: AuthorizedUser<UserPerm | PubPerm>;
}
