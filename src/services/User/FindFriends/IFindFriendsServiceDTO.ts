interface IFindFriendsServiceDTO {
  user_id: string;
  reqUser: AuthorizedUser<UserPerm | PubPerm>;
  name?: string;
  page?: number;
  limit?: number;
}

export { IFindFriendsServiceDTO };
