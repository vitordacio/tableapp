export interface IFindUsersServiceDTO {
  name?: string;
  page?: number;
  limit?: number;
  // reqUser: AuthorizedUser<UserPerm | PubPerm>;
}

export interface IFindUserFriendsServiceDTO {
  user_id: string;
  reqUser: AuthorizedUser<UserPerm | PubPerm>;
  name?: string;
  page?: number;
  limit?: number;
}

export interface IFindCheckUpdateServiceDTO {
  type: string;
  reqUser: AuthorizedUser<UserPerm | PubPerm>;
}
