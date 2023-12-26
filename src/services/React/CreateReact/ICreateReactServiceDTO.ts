export interface ICreateReactUserDTO {
  emoji_id: string;
  user_id: string;
  message?: string;
  reqUser: AuthorizedUser<UserPerm | PubPerm>;
}
export interface ICreateReactEventDTO {
  emoji_id: string;
  event_id: string;
  message?: string;
  reqUser: AuthorizedUser<UserPerm | PubPerm>;
}
