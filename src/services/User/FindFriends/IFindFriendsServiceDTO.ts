interface IFindFriendsServiceDTO {
  friend_id: string;
  user: AuthorizedUser<UserPerm | PubPerm>;
  name?: string;
  page?: number;
  limit?: number;
}

export { IFindFriendsServiceDTO };
