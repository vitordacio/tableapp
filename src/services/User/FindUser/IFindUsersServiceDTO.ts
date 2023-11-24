interface IFindUsersServiceDTO {
  name?: string;
  page?: number;
  limit?: number;
  user: AuthorizedUser<UserPerm | PubPerm>;
}

export { IFindUsersServiceDTO };
